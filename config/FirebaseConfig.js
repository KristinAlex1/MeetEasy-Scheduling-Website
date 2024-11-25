// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meeteasy-293f1.firebaseapp.com",
  projectId: "meeteasy-293f1",
  storageBucket: "meeteasy-293f1.firebasestorage.app",
  messagingSenderId: "798245791477",
  appId: "1:798245791477:web:8c6480ecfa8ebcee5547bc",
  measurementId: "G-1BL28TPMVW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
