// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { firebaseMMKVAdapter } from "../utils/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJCyuFtYixEJA0voP3Y2ZF8oVPRP0-Zkg",
  projectId: "suki-menu",
  storageBucket: "suki-menu.appspot.com",
  appId: "1:712102524565:android:107d8ece99c90696fa4d9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the initialized Firebase app and auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(firebaseMMKVAdapter),
});
export default app;
