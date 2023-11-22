// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, "postos"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);

  
  if (doc.id === 'posto1') {
    const data = doc.data();

    for (const key in data) {
      console.log(`${key}: ${data[key]}`);
    }
    console.log(doc.data());

  };
});
