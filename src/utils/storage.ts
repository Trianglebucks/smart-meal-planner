// utils/storage.ts
import { MMKV } from "react-native-mmkv";
import { PersistStorage, StorageValue } from "zustand/middleware";

// ---- core instance ----
export const storage = new MMKV({
  id: "epod-onyx-storage",
  encryptionKey: "epod-onyx-storage",
});

// ---- raw kv api (for your app) ----
export const mmkvStorage = {
  set: (key: string, value: unknown) => {
    storage.set(key, JSON.stringify(value));
  },
  get: <T = unknown>(key: string): T | null => {
    const str = storage.getString(key);
    return str ? (JSON.parse(str) as T) : null;
  },
  delete: (key: string) => {
    storage.delete(key);
  },
};

// ---- zustand adapter (for persist) ----
export const zustandMMKVStorage = <T>(): PersistStorage<T> => ({
  getItem: (name: string): StorageValue<T> | null => {
    const str = storage.getString(name);
    return str ? (JSON.parse(str) as StorageValue<T>) : null;
  },
  setItem: (name: string, value: StorageValue<T>): void => {
    storage.set(name, JSON.stringify(value));
  },
  removeItem: (name: string): void => {
    storage.delete(name);
  },
});

// 2. Create a specific, typed adapter for Firebase that matches the AsyncStorage API
export const firebaseMMKVAdapter = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    // Firebase persistence expects a Promise to be returned
    return Promise.resolve();
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    // Firebase persistence expects a Promise that resolves with the value
    return Promise.resolve(value || null);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    // Firebase persistence expects a Promise to be returned
    return Promise.resolve();
  },
};
