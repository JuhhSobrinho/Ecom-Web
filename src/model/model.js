// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlyN2d34Me4E6kHyVboJBXmEFxjD1CcXg",
  authDomain: "ecom-postos.firebaseapp.com",
  projectId: "ecom-postos",
  storageBucket: "ecom-postos.appspot.com",
  messagingSenderId: "222662259516",
  appId: "1:222662259516:web:c8410a5510108e2de7a439",
  measurementId: "G-MYJ77XG8E7",
  databaseURL: "https://ecom-postos.firebaseio.com"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

