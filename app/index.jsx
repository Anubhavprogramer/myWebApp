import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={{
        fontSize: 20,
        fontFamily: "lexend-ExtraBold",
        color: "blue",
        textAlign: "center"
      }} >Radhe Radhe</Text>
      <Text>Hello Guysss</Text>
      <Text>Radhe Radhe</Text>
      <Link href={"/login"}>
        <Text>Go to Loginnnnn Screen</Text>
      </Link>
    </View>
  );
}
