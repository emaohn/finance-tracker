 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  getAuth
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBUJYRn3zvux4FUlSbTRkBwtzpLrqBbUBM",
    authDomain: "trakked-f5425.firebaseapp.com",
    projectId: "trakked-f5425",
    storageBucket: "trakked-f5425.appspot.com",
    messagingSenderId: "990022686597",
    appId: "1:990022686597:web:5774f7459015ac90b156ec",
    measurementId: "G-DMRPVGNF4L"
  };  
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
 
export { app, db, auth };