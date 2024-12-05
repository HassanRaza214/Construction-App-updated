// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6N5Y2s3RMp5crOUHpoQBC4ztxPuxErtI",
  authDomain: "construction-app-5d0c6.firebaseapp.com",
  projectId: "construction-app-5d0c6",
  storageBucket: "construction-app-5d0c6.appspot.com",
  messagingSenderId: "529505885513",
  appId: "1:529505885513:web:6350be53fb956548c08e98",
  measurementId: "G-GDG7V76VW0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);