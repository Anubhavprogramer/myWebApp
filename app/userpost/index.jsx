import { View, Text, FlatList, Pressable, Alert } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../Config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import PetListItem from "../../components/Home/PetListItem";
import Color from "../../constants/Color";

export default function Userpost() {
  const navigation = useNavigation();
  const { user } = useUser(); // Destructure user from useUser
  const [posts, setPosts] = React.useState([]); // State to store user posts
  const [loader, setLoader] = React.useState(false); // State to manage loading

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Post",
    });
    user && GetUserPost();
  }, [user]);

  const GetUserPost = async () => {
    setLoader(true);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const snapshot = await getDocs(q);
    const userPosts = [];
    snapshot.forEach((doc) => {
      userPosts.push({ id: doc.id, ...doc.data() });
    });
    setPosts(userPosts); // Update state with user posts
    setLoader(false);
  };

  const deletePet = async (id) => {
    Alert.alert("HEY!", "Are you sure you want to delete this pet?", [
      {
        text: "No",
        onPress: () => console.log("No Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
        //   await db.collection("Pets").doc(id).delete();
        //   GetUserPost();
        console.log("Yes Press");

        },
      },
    ]);
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "lexend-bold",
          fontSize: 24,
        }}
      >
        Userpost
      </Text>
      <FlatList
        refreshing={loader}
        numColumns={2}
        onRefresh={GetUserPost}
        data={posts}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 5,
              marginBottom: 10,
            }}
          >
            <PetListItem pet={item} />
            <Pressable
              style={{
                width: "100%",
                // marginTop: 10,
                // padding: 10,
                backgroundColor: Color.lightprimary,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => deletePet(item.id)}
            >
              <Text
                style={{
                  color: Color.black,
                  fontFamily: "lexend-ExtraBold",
                  // fontWeight: 'bold',
                }}
              >
                Delete
              </Text>
            </Pressable>

            {posts.length === 0 && <Text style={{
          fontFamily: 'lexend-light',
          fontSize: 18,
          marginTop: 10,
        }}>No Pets found</Text>}
          </View>
        )}
      />
    </View>
  );
}
