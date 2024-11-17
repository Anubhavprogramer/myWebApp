import * as SecureStore from 'expo-secure-store'
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        // console.log(`${key} was used 🔐 \n`)
      } else {
        // console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function RootLayout() {
  
  // Get the publishable key from the environment variables
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  try {
    if (!publishableKey) {
      throw new Error("Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
    }
  } catch (error) {
    console.error("Error decoding publishable key:", error.message);
    throw error;
  }
  
  // Log the publishable key for debugging (optional, remove in production)
  // console.log("Publishable Key:", publishableKey);
  // Load custom fonts
  useFonts({
    "lexend-regular": require("./../assets/fonts/LexendDeca-Regular.ttf"),
    "lexend-bold": require("./../assets/fonts/LexendDeca-Bold.ttf"),
    "lexend-light": require("./../assets/fonts/LexendDeca-Light.ttf"),
    "lexend-medium": require("./../assets/fonts/LexendDeca-Medium.ttf"),
    "lexend-ExtraLight": require("./../assets/fonts/LexendDeca-ExtraLight.ttf"),
    "lexend-ExtraBold": require("./../assets/fonts/LexendDeca-ExtraBold.ttf"),
  });


  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          {/* Main screen */}
          <Stack.Screen name="index" />
          
          {/* Login screen with header hiddeen */}
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
