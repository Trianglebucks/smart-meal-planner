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

type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

interface UseAuthProps {
  isRegister: boolean;
  role?: "customer" | "seller";
}

export const useAuth = ({ isRegister, role }: UseAuthProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoggedIn, setAccessToken, setUserRole } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(authSchema(isRegister)),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
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
        const userRole = role || "customer"; // Use role from params, default to customer

        // Create role document in Firestore
        await setDoc(doc(db, "roles", user.uid), { role: userRole });

        // Update global state
        const token = await user.getIdToken();
        setAccessToken(token);
        setUserRole(userRole);
        setIsLoggedIn(true);
      } else {
        // --- Login Logic ---
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Fetch role document from Firestore
        const roleRef = doc(db, "roles", user.uid);
        const roleSnap = await getDoc(roleRef);

        let userRole: "customer" | "seller" = "customer"; // Default role
        if (roleSnap.exists()) {
          userRole = roleSnap.data().role;
        }

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
    passwordToConfirm: watch("password"),
    handleAuthSubmit: handleSubmit(onSubmit),
  };
};
