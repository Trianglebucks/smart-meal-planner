// Only auth is needed directly for getIdToken
import { authSchema } from "@/src/screens/Authentication/Authentication.schema";
import {
  getUserProfile,
  registerUser,
  signInUser,
  signOutUser, // Import signOutUser from service
} from "@/src/services/auth.service"; // Import the new service functions
import { useAuthStore } from "@/src/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const { email, password, username } = data;
    setLoading(true);
    setError(null);

    try {
      if (isRegister) {
        // --- Call the service for registration ---
        if (!username) {
          // Ensure username is present for registration
          throw new Error("Username is required for registration.");
        }
        const user = await registerUser(email, password, username, role);

        const token = await user.getIdToken();
        setAccessToken(token);
        setUserRole(role);
        setIsLoggedIn(true);
      } else {
        // --- Call the service for sign-in ---
        const user = await signInUser(email, password);

        // --- Fetch user profile and enforce role check ---
        const userProfile = await getUserProfile(user.uid);

        if (userProfile && userProfile.role === role) {
          const token = await user.getIdToken();
          setAccessToken(token);
          setUserRole(userProfile.role);
          setIsLoggedIn(true);
        } else {
          // Failure: Role mismatch or user document is missing.
          await signOutUser(); // Use service function to sign out
          setError(`This account is not registered as a ${role}.`);
        }
      }
    } catch (e: any) {
      // --- Refined error handling (now also catching errors thrown by service) ---
      if (
        e.code === "auth/email-already-in-use" ||
        e.message === "auth/email-already-in-use"
      ) {
        setError("That email address is already in use!");
      } else if (e.code === "auth/invalid-email") {
        setError("That email address is invalid!");
      } else if (
        e.code === "auth/user-not-found" ||
        e.code === "auth/wrong-password" ||
        e.code === "auth/invalid-credential"
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

export const useLogout = () => {
  const { logout: logoutInStore } = useAuthStore();

  const logout = async () => {
    try {
      await signOutUser(); // Call the service function to sign out
      logoutInStore(); // Update the store state
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { logout };
};
