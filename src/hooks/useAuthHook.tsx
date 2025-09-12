import { auth, db } from "@/src/config/firebase.config";
import { authSchema } from "@/src/screens/Authentication/Authentication.schema";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";

// --- Updated FormData type to include username ---
type FormData = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

interface UseAuthProps {
  isRegister: boolean;
  role: "customer" | "seller";
}

export const useAuth = ({ isRegister, role }: UseAuthProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoggedIn, setAccessToken, setUserRole } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(authSchema(isRegister)),
    // --- Add username to default values ---
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const { email, password, username } = data; // Destructure username
    setLoading(true);
    setError(null);

    try {
      if (isRegister) {
        // --- Registration Logic ---
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = result.user;

        // Create the user document in the 'users' collection with the username
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          username: username, // Use the username from the form
          email: user.email,
          role: role,
        });

        // Update global state
        const token = await user.getIdToken();
        setAccessToken(token);
        setUserRole(role);
        setIsLoggedIn(true);
      } else {
        // --- Login Logic ---
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Fetch user document from the 'users' collection
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        // Determine role from the document, default to 'customer'
        const userRole = userDoc.exists() ? userDoc.data().role : "customer";

        // Update global state
        const token = await user.getIdToken();
        setAccessToken(token);
        setUserRole(userRole);
        setIsLoggedIn(true);
      }
    } catch (e: any) {
      if (e.code === "auth/email-already-in-use") {
        setError("That email address is already in use!");
      } else if (e.code === "auth/invalid-email") {
        setError("That email address is invalid!");
      } else if (
        e.code === "auth/user-not-found" ||
        e.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    errors,
    loading,
    error,
    handleAuthSubmit: handleSubmit(onSubmit),
  };
};
