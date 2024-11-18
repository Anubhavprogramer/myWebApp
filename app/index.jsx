import { Text, View } from "react-native";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const { user } = useUser();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (rootNavigationState?.key) {
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/login");
      }
    }
  }, [user, rootNavigationState?.key]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text>Hello I am Index</Text>
    </View>
  );
}
