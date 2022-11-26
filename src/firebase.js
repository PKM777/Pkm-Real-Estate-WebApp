// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { dotenv } from 'dotenv'
// dotenv.config()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJIYVnvAN-8k7XvAWsuHA1Yj4eS4h2OSk",
  authDomain: "pkm-react-app.firebaseapp.com",
  projectId: "pkm-react-app",
  storageBucket: "pkm-react-app.appspot.com",
  messagingSenderId: "786076240421",
  appId: "1:786076240421:web:5e865bc145666011050dcc",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const fdb = getFirestore();
