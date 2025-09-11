// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { firebaseMMKVAdapter } from "../utils/storage";

// Firebase configuration details
const firebaseConfig = {
  apiKey: "AIzaSyA2-JQnno1mFetW2BtZzSjsMRq507qHoaU",
  projectId: "smart-meal-planner-8d1f2",
  storageBucket: "smart-meal-planner-8d1f2.firebasestorage.app",
  appId: "1:1063230855092:android:76b5c00e458ee41af804e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the initialized Firebase app and auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(firebaseMMKVAdapter),
});
export default app;
