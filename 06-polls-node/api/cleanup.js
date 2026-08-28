/* ============================================================
   /api/cleanup
   POST { sessionId } → borra las encuestas creadas por esa sesión
   (y los votos que emitió). Endpoint POST aparte porque
   navigator.sendBeacon() —lo que dispara el cierre de pestaña—
   solo puede mandar POST.
============================================================ */
const { getDb } = require('../lib/firebase');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  let sessionId;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    sessionId = body && body.sessionId;
  } catch {
    // se maneja abajo con el chequeo de sessionId
  }
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId.' });

  const db = getDb();
  const batch = db.batch();

  const polls = await db.collection('polls').where('sessionId', '==', sessionId).get();
  polls.docs.forEach(d => batch.delete(d.ref));

  const votes = await db.collection('votes').where('sessionId', '==', sessionId).get();
  votes.docs.forEach(d => batch.delete(d.ref));

  await batch.commit();
  return res.status(200).json({ deletedPolls: polls.size, deletedVotes: votes.size });
};
