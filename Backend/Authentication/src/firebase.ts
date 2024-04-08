// server/firebaseAdmin.ts
import admin from 'firebase-admin';
import serviceAccount from './config/firebase-admin-service-account-key.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

export { admin };
