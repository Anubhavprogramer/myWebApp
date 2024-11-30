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
  const navigator = useNavigation();

  useEffect(() => {
    navigator.setOptions({
      title: "",
    });
  }, []);

  const InitiateChat = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("User email is undefined.");
      return;
    }
  
    if (!pet?.email) {
      console.error("Pet email is undefined.");
      return;
    }
  
    try {
      const docID = `${user.primaryEmailAddress.emailAddress}__${pet.email}`;
      const ID2 = `${pet.email}__${user.primaryEmailAddress.emailAddress}`;
      // console.log("Initiating chat...", docID);
      
      const q = query(
        collection(db, "chats"),
        where("id", "in", [docID, ID2])
      );
      const snapShot = await getDocs(q);
  
      if (!snapShot.empty) {
        snapShot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          router.push({
            pathname: "/chat" ,
            params: { id: doc.id },
          });
        });
      } else {
        const chatData = {
          id: docID,
          users: [
            {
              email: user.primaryEmailAddress.emailAddress,
              name: user.fullName || "Unknown",
              imageURL: user.imageUrl || "",
            },
            {
              email: pet.email,
              name: pet.name || "Unknown",
              imageURL: pet.imageURL || "",
            },
          ],
          userIDs:[
            user.primaryEmailAddress.emailAddress,
            pet.email
            
          ],
        };
        await setDoc(doc(db, "chats", docID), chatData);
        // console.log("Chat initiated with ID:", docID);
        router.push({
          pathname: "/chat",
          params: { id: docID },
        });
      }
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          {/* pet info */}
          <Petinfo pet={pet} />
          {/* pet properties */}
          <PetSubInfo pet={pet} />
          {/* about pet */}
          <AboutPet pet={pet} />
          {/* owner details */}
          <OwnerInfo pet={pet} />
          <View
            style={{
              height: 200,
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={InitiateChat} style={styles.adoptBtn}>
          <Text style={styles.adoptText}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adoptBtn: {
    backgroundColor: Color.primary,
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  adoptText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontFamily: "lexend-bold",
  },
  btnContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 10,
  },
});
