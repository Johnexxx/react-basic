import { MMKV } from 'react-native-mmkv';

// 🔐 Initialize MMKV instance
const storage = new MMKV();

// ----------------------------
// 📌 Type-safe Storage Keys
// ----------------------------
enum StorageKeys {
  TOKEN = 'token',
  EMAIL = 'email',
  APP_VERSION = 'app_version',
}

// ----------------------------
// ✅ Token Functions
// ----------------------------
export const setToken = (token: string): void => {
  console.log('🔐 Saving token:', token);
  storage.set(StorageKeys.TOKEN, token);
};

export const getToken = (): string => {
  const token = storage.getString(StorageKeys.TOKEN) || '';
  console.log('🔐 Retrieved token:', token);
  return token;
};

export const getTokenRaw = (): string | null => {
  return storage.getString(StorageKeys.TOKEN) ?? null;
};

export const clearToken = (): void => {
  console.log('🔐 Clearing token');
  storage.delete(StorageKeys.TOKEN);
};

// ----------------------------
// ✅ Email Functions
// ----------------------------
export const setEmail = (email: string): void => {
  console.log('📧 Saving email:', email);
  storage.set(StorageKeys.EMAIL, email);
};

export const getEmail = (): string => {
  const email = storage.getString(StorageKeys.EMAIL) || '';
  console.log('📧 Retrieved email:', email);
  return email;
};

export const getEmailRaw = (): string | null => {
  return storage.getString(StorageKeys.EMAIL) ?? null;
};

export const clearEmail = (): void => {
  console.log('📧 Clearing email');
  storage.delete(StorageKeys.EMAIL);
};

// ----------------------------
// 🧹 Clear & Reset
// ----------------------------
export const clearAllStorage = (): void => {
  console.log('🧹 Clearing all MMKV storage');
  storage.clearAll();
};

// ----------------------------
// 🔍 Session Check
// ----------------------------
export const isLoggedIn = (): boolean => {
  return !!getTokenRaw(); // or !!getEmailRaw();
};

// ----------------------------
// 🚀 Version Check (Optional)
// ----------------------------
const CURRENT_APP_VERSION = 1;

export const checkAndMigrateStorage = (): void => {
  const savedVersion = storage.getNumber(StorageKeys.APP_VERSION);
  if (savedVersion !== CURRENT_APP_VERSION) {
    console.warn(`🛠 App version changed (${savedVersion} → ${CURRENT_APP_VERSION}), clearing storage...`);
    clearAllStorage();
    storage.set(StorageKeys.APP_VERSION, CURRENT_APP_VERSION);
  }
};

// 📦 Export MMKV instance for debugging or advanced use
export { storage, StorageKeys };
