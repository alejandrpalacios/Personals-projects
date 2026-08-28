/* ============================================================
   /api/polls/:id
   GET    ?sessionId=  → la encuesta + si esta sesión ya votó y qué eligió
   DELETE ?sessionId=  → borra la encuesta (solo su creador)
============================================================ */
const { getDb } = require('../../lib/firebase');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;
  const db = getDb();

  if (req.method === 'GET') {
    const { sessionId } = req.query;
    const doc = await db.collection('polls').doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Poll not found.' });

    const data = doc.data();
    const totalVotes = Object.values(data.options).reduce((sum, o) => sum + (o.votes || 0), 0);

    let votedOptionId = null;
    if (sessionId) {
      const voteDoc = await db.collection('votes').doc(`${id}_${sessionId}`).get();
      if (voteDoc.exists) votedOptionId = voteDoc.data().optionId;
    }

    return res.status(200).json({
      id: doc.id,
      question: data.question,
      options: data.options,
      totalVotes,
      votedOptionId,
      isOwner: sessionId === data.sessionId,
    });
  }

  if (req.method === 'DELETE') {
    const { sessionId } = req.query;
    if (!sessionId) return res.status(400).json({ error: 'Missing sessionId.' });

    const ref = db.collection('polls').doc(id);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: 'Not found.' });
    if (doc.data().sessionId !== sessionId) {
      return res.status(403).json({ error: 'This poll does not belong to your session.' });
    }
    await ref.delete();
    return res.status(200).json({ deleted: true });
  }

  res.setHeader('Allow', 'GET, DELETE');
  return res.status(405).json({ error: 'Method not allowed.' });
};
