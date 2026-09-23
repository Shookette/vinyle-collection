// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrc1u7m9WBScDR-9aqQhkTa94PfYRO1gw",
  authDomain: "vinyle-collection-dd6ca.firebaseapp.com",
  projectId: "vinyle-collection-dd6ca",
  storageBucket: "vinyle-collection-dd6ca.firebasestorage.app",
  messagingSenderId: "441120711872",
  appId: "1:441120711872:web:9ccda73b0c2ac3dd21b925"
};

// Initialize Firebase
const initFirebase = () => initializeApp(firebaseConfig);

export default initFirebase;
