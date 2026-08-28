/* ============================================================
   Inicializa el Admin SDK de Firebase una sola vez por instancia
   de función. Lee las credenciales de variables de entorno.
============================================================ */
const admin = require('firebase-admin');

function getDb() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      }),
    });
  }
  return admin.firestore();
}

/* Borra en segundo plano documentos más viejos que maxAgeMs.
   Red de seguridad además del borrado por sesión, por si el
   navegador nunca llega a avisar que cerró la pestaña. */
function cleanupStale(db, collection, maxAgeMs = 24 * 60 * 60 * 1000, limit = 20) {
  const cutoff = Date.now() - maxAgeMs;
  db.collection(collection)
    .where('createdAt', '<', cutoff)
    .limit(limit)
    .get()
    .then(snap => {
      if (snap.empty) return;
      const batch = db.batch();
      snap.docs.forEach(d => batch.delete(d.ref));
      return batch.commit();
    })
    .catch(() => { /* limpieza best-effort, no crítica */ });
}

module.exports = { admin, getDb, cleanupStale };
