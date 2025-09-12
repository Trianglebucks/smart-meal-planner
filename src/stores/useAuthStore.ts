import { create } from "zustand";
import { persist } from "zustand/middleware";

import { zustandMMKVStorage } from "../utils/storage";

export type UserRole = "customer" | "seller" | null;

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  userRole: UserRole;
  setAccessToken: (token: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserRole: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,
      userRole: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setUserRole: (role) => set({ userRole: role }),
      logout: () =>
        set({
          accessToken: null,
          isLoggedIn: false,
          userRole: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: zustandMMKVStorage(),
    }
  )
);
