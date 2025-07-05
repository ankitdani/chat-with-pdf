import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWBBifqSmvWSWeXQKMxv9O9QIC2fgBLGY",
  authDomain: "chat-with-pdf-89e0a.firebaseapp.com",
  projectId: "chat-with-pdf-89e0a",
  storageBucket: "chat-with-pdf-89e0a.firebasestorage.app",
  messagingSenderId: "641124044518",
  appId: "1:641124044518:web:759f11a9c63f51e63a7527",
  measurementId: "G-2C98HZY2GB",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage };
