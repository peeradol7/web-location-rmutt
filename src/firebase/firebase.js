// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiXoDonSasIZ99RaZA69bnVTMIlH9nYEY",
  authDomain: "mapdatabase-f3797.firebaseapp.com",
  databaseURL: "https://mapdatabase-f3797-default-rtdb.firebaseio.com",
  projectId: "mapdatabase-f3797",
  storageBucket: "mapdatabase-f3797.appspot.com",
  messagingSenderId: "166629524832",
  appId: "1:166629524832:web:bcddbda411dd203585ca05",
  measurementId: "G-QNHKZP85V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db}