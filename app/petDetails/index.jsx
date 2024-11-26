import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Petinfo from "../../components/PetDetails/petinfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Color from "../../constants/Color";
import { useUser } from "@clerk/clerk-expo";
import { collection, doc, where, query } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import { getDocs, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const { user } = useUser();

  const router = useRouter();
  // console.log(pet)
  const navigator = useNavigation();
  useEffect(() => {
    navigator.setOptions({
      title: "",
    });
  }, []);

  const InitiateChat = async () => {
    const userId = user?.primaryEmailAddress?.emailAddress + "__" + pet?.email;
    const ID2 = pet?.email + "__" + user?.primaryEmailAddress?.emailAddress;

    const q = query(
      collection(db, "chats"),
      where("chatId", "in", [userId, ID2])
    );
    const snapShot = await getDocs(q);
    // console.log(snapShot);

    if (snapShot.docs?.length == 0) {
      await setDoc(doc(db, "chats", userId), {
        id: userId,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageURL: user?.imageUrL,
            name: user?.fullName,
          },
          {
            email: pet?.email,
            imageURL: pet?.imageURL,
            name: pet?.name,
          }
        ],
      });
    }
    router.push({
      pathname: "/ChatScreen",
      params: { id: userId },
    });
  };

  return (
    <View>
      <ScrollView>
        <View>
          {/* pet info */}
          <Petinfo pet={pet} />
          {/* pet props */}
          <PetSubInfo pet={pet} />
          {/* about */}
          <AboutPet pet={pet} />
          {/* owner details */}
          <OwnerInfo pet={pet} />
          {/* adopt me */}
          <View
            style={{
              height: 70,
            }}
          ></View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={InitiateChat} style={styles.adoptBtn}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              padding: 10,
              fontSize: 20,
              fontFamily: "lexend-bold",
            }}
          >
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adoptBtn: {
    backgroundColor: Color.primary,
    // borderRadius: 15,
  },
  btnContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    // padding: 10
  },
});
