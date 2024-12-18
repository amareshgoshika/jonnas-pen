import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAuJdFJwMbO0h88R3Y59AwyGb5krWXlYms",
  authDomain: "jonnaspen-acb0e.firebaseapp.com",
  projectId: "jonnaspen-acb0e",
  storageBucket: "jonnaspen-acb0e.firebasestorage.app",
  messagingSenderId: "931800610276",
  appId: "1:931800610276:web:813c98751ee95df6e103f1",
  measurementId: "G-2215M50NRL"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const auth = getAuth(app);

export { db, collection, getDocs, query, where, auth, app };