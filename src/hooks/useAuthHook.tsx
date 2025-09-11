// hooks/useAuth.ts
import { auth } from "@/src/config/firebase.config";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authSchema } from "../screens/Authentication/Authentication.schema";

type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

// The hook accepts `isRegister` to dynamically change the validation schema
export const useAuth = (isRegister: boolean) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoggedIn, setAccessToken } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(authSchema(isRegister)),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    setLoading(true);
    setError(null);

    try {
      const authFunction = isRegister
        ? createUserWithEmailAndPassword
        : signInWithEmailAndPassword;

      const result = await authFunction(auth, email, password);
      const user = result.user;
      const token = await user.getIdToken();

      setAccessToken(token);
      setIsLoggedIn(true);
    } catch (e: any) {
      // Your existing error handling logic
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

  // Return everything the component needs
  return {
    control,
    errors,
    loading,
    error,
    passwordToConfirm: watch("password"), // For confirmPassword validation
    handleAuthSubmit: handleSubmit(onSubmit), // Pre-wrapped submit handler
  };
};
