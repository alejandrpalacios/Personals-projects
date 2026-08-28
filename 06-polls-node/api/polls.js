/* ============================================================
   /api/polls
   GET    ?sessionId=            → encuestas creadas por esa sesión
   POST   { question, options[], sessionId } → crea una encuesta
============================================================ */
const { getDb, cleanupStale } = require('../lib/firebase');

const ID_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789';
function randomId(len = 7) {
  let out = '';
  for (let i = 0; i < len; i++) out += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)];
  return out;
}

const OPTION_KEYS = ['a', 'b', 'c', 'd', 'e', 'f'];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const db = getDb();

  if (req.method === 'POST') {
    cleanupStale(db, 'polls');
    cleanupStale(db, 'votes');

    const { question, options, sessionId } = req.body || {};

    if (!sessionId) return res.status(400).json({ error: 'Missing session.' });
    if (!question || !question.trim() || question.trim().length > 140) {
      return res.status(400).json({ error: 'Please write a question (up to 140 characters).' });
    }
    const cleanOptions = (Array.isArray(options) ? options : [])
      .map(o => (typeof o === 'string' ? o.trim() : ''))
      .filter(Boolean)
      .slice(0, OPTION_KEYS.length);

    if (cleanOptions.length < 2) {
      return res.status(400).json({ error: 'Add at least 2 options.' });
    }
    if (cleanOptions.some(o => o.length > 80)) {
      return res.status(400).json({ error: 'Each option must be 80 characters or fewer.' });
    }

    const options_ = {};
    cleanOptions.forEach((text, i) => {
      options_[OPTION_KEYS[i]] = { text, votes: 0 };
    });

    let id = randomId();
    for (let attempts = 0; attempts < 5; attempts++) {
      const existing = await db.collection('polls').doc(id).get();
      if (!existing.exists) break;
      id = randomId();
    }

    await db.collection('polls').doc(id).set({
      question: question.trim(),
      options: options_,
      sessionId,
      createdAt: Date.now(),
    });

    return res.status(201).json({ id });
  }

  if (req.method === 'GET') {
    const { sessionId } = req.query;
    if (!sessionId) return res.status(400).json({ error: 'Missing sessionId.' });

    const snap = await db.collection('polls').where('sessionId', '==', sessionId).get();
    const polls = snap.docs
      .map(d => {
        const data = d.data();
        const totalVotes = Object.values(data.options).reduce((sum, o) => sum + (o.votes || 0), 0);
        return { id: d.id, question: data.question, createdAt: data.createdAt, totalVotes };
      })
      .sort((a, b) => b.createdAt - a.createdAt);

    return res.status(200).json({ polls });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed.' });
};
