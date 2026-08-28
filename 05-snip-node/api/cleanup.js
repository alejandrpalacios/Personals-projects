/* ============================================================
   /api/cleanup
   POST { sessionId } → borra todos los links de esa sesión.
   Existe como endpoint POST aparte (en vez de reusar el DELETE de
   /api/links) porque navigator.sendBeacon() — lo que dispara el
   navegador al cerrar la pestaña — solo puede mandar POST.
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
    // cuerpo inválido — se maneja abajo con el chequeo de sessionId
  }

  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId.' });

  const db = getDb();
  const snap = await db.collection('links').where('sessionId', '==', sessionId).get();
  const batch = db.batch();
  snap.docs.forEach(d => batch.delete(d.ref));
  await batch.commit();

  return res.status(200).json({ deleted: snap.size });
};
