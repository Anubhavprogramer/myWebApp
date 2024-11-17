import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

// Get the publishable key from the environment variables
let publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

try {
  if (!publishableKey) {
    throw new Error("Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }
} catch (error) {
  console.error("Error decoding publishable key:", error.message);
  throw error;
}

// Log the publishable key for debugging (optional, remove in production)
console.log("Publishable Key:", publishableKey);

export default function RootLayout() {
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
    <ClerkProvider publishableKey={publishableKey}>
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
