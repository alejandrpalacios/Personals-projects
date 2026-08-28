/* ============================================================
   /api/links/:code
   DELETE ?sessionId=  → borra un link puntual (botón "eliminar"
                         en la lista) — solo si pertenece a la sesión
============================================================ */
const { getDb } = require('../../lib/firebase');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { code } = req.query;
  const db = getDb();

  if (req.method === 'DELETE') {
    const { sessionId } = req.query;
    if (!sessionId) return res.status(400).json({ error: 'Missing sessionId.' });

    const ref = db.collection('links').doc(code);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: 'Not found.' });
    if (doc.data().sessionId !== sessionId) {
      return res.status(403).json({ error: 'This link does not belong to your session.' });
    }
    await ref.delete();
    return res.status(200).json({ deleted: true });
  }

  res.setHeader('Allow', 'DELETE');
  return res.status(405).json({ error: 'Method not allowed.' });
};
