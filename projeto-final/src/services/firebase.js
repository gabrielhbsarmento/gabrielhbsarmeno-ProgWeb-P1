// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEbf9Nz2ukJ4if_i95kRM9d9-SxMQsl9A",
  authDomain: "restaurante-c0058.firebaseapp.com",
  projectId: "restaurante-c0058",
  storageBucket: "restaurante-c0058.appspot.com",
  messagingSenderId: "844767187814",
  appId: "1:844767187814:web:a17565c1b8a99129ffaea7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()