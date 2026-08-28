/* ============================================================
   /api/polls/:id/vote
   POST { optionId, sessionId } → registra un voto, una vez por sesión.
   El doc de voto usa "{pollId}_{sessionId}" como id: crearlo con
   .create() falla solo si ya existe, así que sirve de guardia
   contra el doble voto sin necesitar una transacción aparte.
============================================================ */
const { getDb, admin } = require('../../../lib/firebase');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { id } = req.query;
  const { optionId, sessionId } = req.body || {};
  if (!optionId || !sessionId) {
    return res.status(400).json({ error: 'Missing optionId or sessionId.' });
  }

  const db = getDb();
  const pollRef = db.collection('polls').doc(id);
  const pollDoc = await pollRef.get();
  if (!pollDoc.exists) return res.status(404).json({ error: 'Poll not found.' });
  if (!pollDoc.data().options[optionId]) {
    return res.status(400).json({ error: 'Invalid option.' });
  }

  const voteRef = db.collection('votes').doc(`${id}_${sessionId}`);
  try {
    await voteRef.create({ pollId: id, sessionId, optionId, createdAt: Date.now() });
  } catch {
    return res.status(409).json({ error: 'You already voted on this poll.' });
  }

  await pollRef.update({
    [`options.${optionId}.votes`]: admin.firestore.FieldValue.increment(1),
  });

  return res.status(200).json({ voted: true });
};
