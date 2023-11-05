import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2EE0JR8ePTK-mqrc6A1-_xxJskaGIwUM",
  authDomain: "linked-in-c3825.firebaseapp.com",
  projectId: "linked-in-c3825",
  storageBucket: "linked-in-c3825.appspot.com",
  messagingSenderId: "1042289987384",
  appId: "1:1042289987384:web:9730ef790da34349737bcd",
  measurementId: "G-KXPKXRGKP8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider };
