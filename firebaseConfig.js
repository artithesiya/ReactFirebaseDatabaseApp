// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import database from '@react-native-firebase/database';
import firebaseConfig from './firebaseConfig';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcOt1Ht4jasc0qt2tbQUYWo97JKtJzdDM",
  authDomain: "react-database-demo-e42f6.firebaseapp.com",
  databaseURL: "https://react-database-demo-e42f6-default-rtdb.firebaseio.com",
  projectId: "react-database-demo-e42f6",
  storageBucket: "react-database-demo-e42f6.appspot.com",
  messagingSenderId: "695697754301",
  appId: "1:695697754301:web:8a1f4982c5b4195d954fd4",
  measurementId: "G-0EY6ELHVLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
database().initializeApp(firebaseConfig);