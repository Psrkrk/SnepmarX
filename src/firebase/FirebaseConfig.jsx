// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASoTU3VkSIOyROU82xFUB34sFHyrvkBIc",
  authDomain: "ecommerce-application-ff73d.firebaseapp.com",
  projectId: "ecommerce-application-ff73d",
  storageBucket: "ecommerce-application-ff73d.firebasestorage.app",
  messagingSenderId: "294823550129",
  appId: "1:294823550129:web:e8b59598f59742343e9690",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
