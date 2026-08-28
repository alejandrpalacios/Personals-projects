/* ============================================================
   /api/go/:code
   Redirige (302) a la URL original y suma un clic.
   Esta es la ruta que de verdad "acorta" el link.
============================================================ */
const { getDb, admin } = require('../../lib/firebase');

module.exports = async (req, res) => {
  const { code } = req.query;
  const db = getDb();

  const ref = db.collection('links').doc(code);
  const doc = await ref.get();

  if (!doc.exists) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end('<h1>Link not found</h1><p>This short link does not exist or has expired.</p>');
  }

  // No se espera el resultado: no debe frenar el redirect al usuario.
  ref.update({ clicks: admin.firestore.FieldValue.increment(1) }).catch(() => {});

  res.writeHead(302, { Location: doc.data().url });
  res.end();
};
