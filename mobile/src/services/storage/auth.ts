import * as SecureStore from "expo-secure-store";

const KEYCHAIN_SERVICE = "com.myapp.auth";

export const storeToken = async (token: string): Promise<boolean> => {
  try {
    await SecureStore.setItemAsync(KEYCHAIN_SERVICE, token);
    return true;
  } catch (error) {
    console.error("SecureStore error:", error);
    return false;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(KEYCHAIN_SERVICE);
  } catch (error) {
    console.error("SecureStore error:", error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(KEYCHAIN_SERVICE);
};
