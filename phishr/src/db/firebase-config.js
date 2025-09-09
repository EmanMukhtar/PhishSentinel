
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyDQ7TkOLuxqBpX34q37OWmioNv54Gm6R5E",
  authDomain: "safe-3cfff.firebaseapp.com",
  projectId: "safe-3cfff",
  storageBucket: "safe-3cfff.firebasestorage.app",
  messagingSenderId: "119948694983",
  appId: "1:119948694983:web:4a2e866f0130955517b5e2",
  measurementId: "G-8YCQ94DQ9M"
};


// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore
export const db = getFirestore(firebaseApp);
export { auth, googleAuthProvider };