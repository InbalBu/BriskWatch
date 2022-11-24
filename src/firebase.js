import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the auth instance from the app

// Create a new user account
export const registerUser = async (email, password, displayName) => {
    try{
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {displayName});
        console.log(auth.currentUser);
    } catch(error) {
        return error.message.replace('Firebase: ', '');
    }
}

export const loginUser = async (email, password) => {
    try {
       const user = await signInWithEmailAndPassword(auth, email, password);
       console.log(user);
    } catch(error) {
        return error.message.replace('Firebase: ', '');
    }
}

export const authListener = (setCurrentUser) => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(null);
        }
    });
}

export const logout = () => {
    signOut(auth);
}

export const registerProvider = async () => {
    const provider = new GoogleAuthProvider(); // GoogleAuthProvider is a class
    await signInWithPopup(auth, provider); // opens a popup window
} 

export const forgotPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return 'Please check your email!';
    }
    catch(error) {
        return error.message.replace('Firebase: ', '');
    }
}