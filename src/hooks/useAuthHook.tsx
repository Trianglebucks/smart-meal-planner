import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { authSchema } from "@/src/screens/Authentication/Authentication.schema";
import {
  getUserProfile,
  registerUser,
  signInUser,
  signOutUser,
} from "@/src/services/auth.service";
import { useAuthStore } from "@/src/stores/useAuthStore";

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

const authMutationFn = async ({
  isRegister,
  role,
  data,
}: {
  isRegister: boolean;
  role: "customer" | "seller";
  data: FormData;
}) => {
  const { email, password, username } = data;

  if (isRegister) {
    if (!username) throw new Error("Username is required for registration.");
    const user = await registerUser(email, password, username, role);
    const token = await user.getIdToken();
    return { token, role };
  } else {
    const user = await signInUser(email, password);
    const userProfile = await getUserProfile(user.uid);

    if (userProfile && userProfile.role === role) {
      const token = await user.getIdToken();
      return { token, role: userProfile.role };
    } else {
      await signOutUser();
      throw new Error(`This account is not registered as a ${role}.`);
    }
  }
};

export const useAuth = ({ isRegister, role }: UseAuthProps) => {
  const [customError, setCustomError] = useState<string | null>(null);
  const { setIsLoggedIn, setAccessToken, setUserRole } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate: performAuthAction, isPending } = useMutation({
    mutationFn: authMutationFn,
    onSuccess: (data) => {
      setAccessToken(data.token);
      setUserRole(data.role);
      setIsLoggedIn(true);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (e: unknown) => {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case "auth/email-already-in-use":
            setCustomError("That email address is already in use!");
            break;
          case "auth/invalid-email":
            setCustomError("That email address is invalid!");
            break;
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/invalid-credential":
            setCustomError("Invalid email or password.");
            break;
          default:
            setCustomError("An unknown error occurred. Please try again.");
            break;
        }
      } else if (e instanceof Error) {
        setCustomError(e.message);
      }
      console.error(e);
    },
    onMutate: () => {
      setCustomError(null);
    },
  });

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

  const onSubmit = (data: FormData) => {
    performAuthAction({ isRegister, role, data });
  };

  return {
    control,
    errors,
    loading: isPending,
    error: customError,
    handleAuthSubmit: handleSubmit(onSubmit),
  };
};

export const useLogout = () => {
  const { logout: logoutInStore } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      logoutInStore();
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Error during logout:", error);
    },
  });

  return { logout, isLoggingOut };
};
