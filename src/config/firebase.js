import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDuKKltyrToh9e-6tJlS8jZBnQLT9xVqbY",
  authDomain: "fir-contact-36f95.firebaseapp.com",
  projectId: "fir-contact-36f95",
  storageBucket: "fir-contact-36f95.appspot.com",
  messagingSenderId: "112531339886",
  appId: "1:112531339886:web:00c0e2480182862f14847f",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
