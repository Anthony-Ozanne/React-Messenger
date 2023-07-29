import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf7l4oKYPYXuLs_fExE_O_zsCafXRnhcA",
  authDomain: "react-messenger-56940.firebaseapp.com",
  databaseURL:
    "https://react-messenger-56940-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-messenger-56940",
  storageBucket: "react-messenger-56940.appspot.com",
  messagingSenderId: "453935944510",
  appId: "1:453935944510:web:5d62f6d29421a71bdf126f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Create a root reference
export const storage = getStorage();
export const db = getFirestore();
