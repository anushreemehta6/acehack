import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBHoYAGDQsbhl4a75N70rQ2r-nPsWUTbA0",
  authDomain: "insideout-2d487.firebaseapp.com",
  projectId: "insideout-2d487",
  storageBucket: "insideout-2d487.firebasestorage.app",
  messagingSenderId: "262139154805",
  appId: "1:262139154805:web:a5019a7be5bdbfc4c6833c",
  measurementId: "G-EY18XF3PMZ"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, auth, analytics }; 