import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD143y5etVJXkt45WmfyjasFucJvlKK7og",
  authDomain: "shapeup-fdc6e.firebaseapp.com",
  projectId: "shapeup-fdc6e",
  storageBucket: "shapeup-fdc6e.appspot.com",
  messagingSenderId: "750988046443",
  appId: "1:750988046443:web:bfbd2cc24e027c28d2412e",
  measurementId: "G-Y5MQCVDZT7"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

