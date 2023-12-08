import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCyFXS2D4e3IzQ6hwC9Bs8i5Q_I4JGqxc8",
  authDomain: "zoomcloneproject.firebaseapp.com",
  projectId: "zoomcloneproject",
  storageBucket: "zoomcloneproject.appspot.com",
  messagingSenderId: "115212942517",
  appId: "1:115212942517:web:383467b5b3d08c59a712fc",
  measurementId: "G-0FTHLYJ60Z"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
