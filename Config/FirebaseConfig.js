// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adoption-143ff.firebaseapp.com",
  projectId: "pet-adoption-143ff",
  storageBucket: "pet-adoption-143ff.firebasestorage.app",
  messagingSenderId: "513309571158",
  appId: "1:513309571158:web:df4e320533c146a7ae23f7",
  measurementId: "G-K697SMYND0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);