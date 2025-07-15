import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export enum StorageKeys {
  TOKEN = 'token',
  EMAIL = 'email',
  APP_VERSION = 'app_version',
}

// 🔐 Token
export const setToken = (token: string) => {
  storage.set(StorageKeys.TOKEN, token);
};
export const getToken = (): string => storage.getString(StorageKeys.TOKEN) || '';
export const clearToken = () => storage.delete(StorageKeys.TOKEN);

// 📧 Email
export const setEmail = (email: string) => {
  storage.set(StorageKeys.EMAIL, email);
};
export const getEmail = (): string => storage.getString(StorageKeys.EMAIL) || '';
export const clearEmail = () => storage.delete(StorageKeys.EMAIL);

// 🧹 Clear everything
export const clearAllStorage = () => {
  storage.clearAll();
};

// ✅ Is logged in
export const isLoggedIn = (): boolean => {
  return !!storage.getString(StorageKeys.EMAIL);
};

// 🚀 Versioning (optional)
const CURRENT_VERSION = 1;
export const checkAndMigrateStorage = () => {
  const saved = storage.getNumber(StorageKeys.APP_VERSION);
  if (saved !== CURRENT_VERSION) {
    clearAllStorage();
    storage.set(StorageKeys.APP_VERSION, CURRENT_VERSION);
  }
};

export { storage };
