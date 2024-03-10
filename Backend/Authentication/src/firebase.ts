import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import admin from 'firebase-admin';
import serviceAccount from './config/firebase-admin-service-account-key.json' assert { type: 'json' };

const firebaseConfig = {
  apiKey: 'AIzaSyDUa7wiM3jpYc6utd9PyySBz4t-Ie2gRsw',
  authDomain: 'i-gaming-usa-insights.firebaseapp.com',
  projectId: 'i-gaming-usa-insights',
  storageBucket: 'i-gaming-usa-insights.appspot.com',
  messagingSenderId: '577750147665',
  appId: '1:577750147665:web:d9d90858ce941ac3204e70',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  // databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firebase project's database URL
});

export { admin };
