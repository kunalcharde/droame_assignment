// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyBhkkCCXxNNzJxbGSeNrZBnj_n_TNk0dyo",
  authDomain: "droame-40986.firebaseapp.com",
  projectId: "droame-40986",
  storageBucket: "droame-40986.appspot.com",
  messagingSenderId: "71231800795",
  appId: "1:71231800795:web:9a40007ea1d0e5aeced3fe",
  measurementId: "G-45PVV2SK6Y"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);