// src/services/auth.service.ts
import { auth, db } from "@/src/config/firebase.config"; // Assuming this path is correct
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword, // Renamed to avoid conflict
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Define an interface for the user data we store in Firestore
interface UserProfile {
  username: string;
  email: string;
  role: "customer" | "seller";
}

// --- Service Functions ---

/**
 * Registers a new user with Firebase Authentication and creates a user profile in Firestore.
 * @param email - The user's email.
 * @param password - The user's password.
 * @param username - The user's chosen username.
 * @param role - The user's role ('customer' or 'seller').
 * @returns The Firebase User object.
 * @throws An error if registration fails or email is already in use (checked via Firestore).
 */
export const registerUser = async (
  email: string,
  password: string,
  username: string,
  role: "customer" | "seller"
): Promise<User> => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;

  const userDocRef = doc(db, "users", user.uid);
  await setDoc(userDocRef, {
    username: username,
    email: user.email,
    role: role,
  });

  return user;
};

/**
 * Signs in an existing user with Firebase Authentication.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns The Firebase User object.
 * @throws An error if sign-in fails or credentials are invalid.
 */
export const signInUser = async (
  email: string,
  password: string
): Promise<User> => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

/**
 * Fetches a user's profile from Firestore.
 * @param uid - The user's Firebase UID.
 * @returns The UserProfile object from Firestore, or null if not found.
 */
export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return null;
};

/**
 * Signs out the current user from Firebase.
 */
export const signOutUser = async (): Promise<void> => {
  await firebaseSignOut(auth);
};
