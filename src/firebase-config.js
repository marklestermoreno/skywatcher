
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCH1EWEmfnVpQcGLEGR1u8mVcGCk3VmNx0",
  authDomain: "skywatcher-22423.firebaseapp.com",
  projectId: "skywatcher-22423",
  storageBucket: "skywatcher-22423.appspot.com",
  messagingSenderId: "323371815225",
  appId: "1:323371815225:web:75b3cf280cee80c29618e8",
  measurementId: "G-GRE09HVMGH"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider();
