// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf3iuxuWGvtyr_BulwGdy6cNrZpSoMt-o",
  authDomain: "confey-db516.firebaseapp.com",
  projectId: "confey-db516",
  storageBucket: "confey-db516.appspot.com",
  messagingSenderId: "479932086706",
  appId: "1:479932086706:web:e627403d554ad411e54cab",
  measurementId: "G-X157EVCX08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firestore database
export const db = getFirestore(app);

// firebase authentication (useContext)
export const auth = getAuth(app);