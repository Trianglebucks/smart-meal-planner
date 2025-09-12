// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseMMKVAdapter } from "../utils/storage";

// Your full Firebase configuration object.
// It's recommended to load these from environment variables for better security.
const firebaseConfig = {
  apiKey: "AIzaSyCJCyuFtYixEJA0voP3Y2ZF8oVPRP0-Zkg",
  authDomain: "suki-menu.firebaseapp.com",
  projectId: "suki-menu",
  storageBucket: "suki-menu.appspot.com",
  messagingSenderId: "712102524565",
  appId: "1:712102524565:android:107d8ece99c90696fa4d9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(firebaseMMKVAdapter),
});

// Initialize and export Firestore Database
export const db = getFirestore(app);

export default app;
