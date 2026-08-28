/* ============================================================
   /api/links
   GET    ?sessionId=   → lista los links creados por esa sesión
   POST   { url, sessionId } → crea un link corto
   DELETE ?sessionId=   → borra todos los links de esa sesión
                          (limpieza al cerrar la pestaña vía fetch)
============================================================ */
const { getDb, cleanupStale } = require('../lib/firebase');

const CODE_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789';

function randomCode(len = 6) {
  let out = '';
  for (let i = 0; i < len; i++) {
    out += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return out;
}

function isValidUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const db = getDb();

  if (req.method === 'POST') {
    cleanupStale(db, 'links');

    const { url, sessionId } = req.body || {};
    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: 'Please provide a valid http(s) URL.' });
    }
    if (!sessionId) {
      return res.status(400).json({ error: 'Missing session.' });
    }

    let code = randomCode();
    for (let attempts = 0; attempts < 5; attempts++) {
      const existing = await db.collection('links').doc(code).get();
      if (!existing.exists) break;
      code = randomCode();
    }

    await db.collection('links').doc(code).set({
      url,
      sessionId,
      clicks: 0,
      createdAt: Date.now(),
    });

    return res.status(201).json({ code });
  }

  if (req.method === 'GET') {
    const { sessionId } = req.query;
    if (!sessionId) return res.status(400).json({ error: 'Missing sessionId.' });

    const snap = await db.collection('links').where('sessionId', '==', sessionId).get();
    const links = snap.docs
      .map(d => ({ code: d.id, ...d.data() }))
      .sort((a, b) => b.createdAt - a.createdAt);

    return res.status(200).json({ links });
  }

  if (req.method === 'DELETE') {
    const { sessionId } = req.query;
    if (!sessionId) return res.status(400).json({ error: 'Missing sessionId.' });

    const snap = await db.collection('links').where('sessionId', '==', sessionId).get();
    const batch = db.batch();
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();

    return res.status(200).json({ deleted: snap.size });
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({ error: 'Method not allowed.' });
};
