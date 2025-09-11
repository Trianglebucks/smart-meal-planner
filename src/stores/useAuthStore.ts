import { create } from "zustand";
import { persist } from "zustand/middleware";

import { zustandMMKVStorage } from "../utils/storage";

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,
      setAccessToken: (token) => set({ accessToken: token }),
      setIsLoggedIn(isLoggedIn) {
        set({ isLoggedIn });
      },
    }),
    {
      name: "auth-storage",
      storage: zustandMMKVStorage(),
    }
  )
);
