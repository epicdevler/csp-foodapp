
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const isLocalHost = location.hostname === "localhost" || location.hostname === "127.0.0.1"


const firebaseConfig = {
  apiKey: "AIzaSyBISa5w3UtyIDu5jTg38I_W1-3wqLq30Uo",
  authDomain: "cs-foodapp.firebaseapp.com",
  projectId: "cs-foodapp",
  storageBucket: "cs-foodapp.appspot.com",
  messagingSenderId: "385838129821",
  appId: "1:385838129821:web:a3c84c19772318cbbeea74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = isLocalHost ? getAuth() : getAuth(app)
export const firestore_db = isLocalHost ? getFirestore() : getFirestore(app);
export const storage_db = isLocalHost ? getStorage() : getStorage(app)

if (isLocalHost) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099')
  connectFirestoreEmulator(firestore_db, '127.0.0.1', 8081)
  connectStorageEmulator(storage_db, "127.0.0.1", 9199)
}
