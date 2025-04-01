// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcpX4unHTnq5IQ6yPX-cnt3t93IaB5hyU",
  authDomain: "oqulixcrm.firebaseapp.com",
  projectId: "oqulixcrm",
  storageBucket: "oqulixcrm.firebasestorage.app",
  messagingSenderId: "496191416480",
  appId: "1:496191416480:web:b0bed78a7dab3fbe1801c5",
  measurementId: "G-2P26EXTGX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);