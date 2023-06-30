
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_PASSWORD,
  authDomain: import.meta.env.VITE_DOMAIN,
  projectId: "crud-17",
  storageBucket: "crud-17.appspot.com",
  messagingSenderId: "290134568114",
  appId: "1:290134568114:web:b23c8e46620423a7b22dab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export{db}
