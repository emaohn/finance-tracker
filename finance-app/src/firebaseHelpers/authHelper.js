import { Google } from '@mui/icons-material';
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

import { db, auth } from './config'


// Function to register a new user
const registerUser = async (newUser) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
    const user = userCredential.user;
    console.log('User registered:', user.uid);
    const docRef = await setDoc(doc(db, "users", user.uid), newUser)
    console.log('Added user to firestore: ', newUser)
    return docRef;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

// Function to log in an existing user
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User logged in:', user.uid);
    return user;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
};

// const googleLogin = async () => {
//   signInWithRedirect(auth, provider);
// }

// Function to log out the current user
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error.message);
    throw error;
  }
};

// Function to listen for changes in authentication status
const onAuthStatusChanged = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export { registerUser, loginUser, logoutUser, onAuthStatusChanged };
