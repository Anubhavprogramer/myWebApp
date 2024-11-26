import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import Color from "../../constants/Color";
import { TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function AddnewPet() {
  const navigation = useNavigation();
  const user = useUser();

  // console.log("User: ", user);

  const [formData, setFormData] = useState({
    category: "Dog",
    sex: "male",
    name: "",
    breed: "",
    age: "",
    weight: "",
    address: "",
    about: "",
  });
  const [Gender, setGender] = useState(formData.sex);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(formData.category);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: "Add new Pet",
    });
    GetCategories();
  }, [navigation]);

  const GetCategories = async () => {
    try {
      const snapShot = await getDocs(collection(db, "Category"));
      const categories = [];
      snapShot.forEach((doc) => {
        categories.push(doc.data());
      });
      setCategory(categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  const onSubmit = async () => {
    setLoading(true);

    // Validation for required fields
    if (
      !formData.name ||
      !formData.breed ||
      !formData.age ||
      !formData.weight ||
      !formData.address ||
      !formData.about
    ) {
      ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
      setLoading(false);
      return;
    }

    try {
      const docID = Date.now().toString();
      const username = user?.fullName || "Anonymous";
      const email = user?.primaryEmailAddress?.emailAddress || "no-email@example.com";
      const userImage = user?.profileImageUrl || "";


      await setDoc(doc(db, "Pets", docID), {
        ...formData,
        iD: docID,
        username,
        email,
        userImage,
      });
      ToastAndroid.show("Pet added successfully!", ToastAndroid.SHORT);
      console.log("Document written with ID: ", docID);
    } catch (error) {
      console.error("Error adding document: ", error);
      ToastAndroid.show("Failed to add pet. Try again later.", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.inputContainer}>Pet Name*</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Pet Name"
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.inputContainer}>Breed*</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Pet Breed"
            onChangeText={(value) => handleInputChange("breed", value)}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.inputContainer}>Age*</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Pet Age"
            onChangeText={(value) => handleInputChange("age", value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.inputContainer}>Weight*</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Pet Weight"
            onChangeText={(value) => handleInputChange("weight", value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={Gender}
            onValueChange={(itemValue) => {
              setGender(itemValue);
              handleInputChange("sex", itemValue);
            }}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => {
              setSelectedCategory(itemValue);
              handleInputChange("category", itemValue);
            }}
          >
            {category.map((cat, index) => (
              <Picker.Item key={index} label={cat.animal} value={cat.animal} />
            ))}
          </Picker>
        </View>
        <View style={styles.box}>
          <Text style={styles.inputContainer}>Address*</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Address"
            onChangeText={(value) => handleInputChange("address", value)}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.inputContainer}>About The Pet*</Text>
          <TextInput
            numberOfLines={5}
            style={[styles.inputField, { lineHeight: 20 }]}
            multiline
            placeholder="My Dog is Cute"
            onChangeText={(value) => handleInputChange("about", value)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}
          disabled={Loading}
        >
          {Loading ? (
            <ActivityIndicator color={Color.white} />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    fontFamily: "lexend-regular",
    fontSize: 12,
    color: Color.primary,
  },
  inputField: {
    padding: 15,
    fontFamily: "lexend-regular",
    backgroundColor: Color.white,
    borderRadius: 10,
    marginVertical: 3,
  },
  box: {
    marginVertical: 5,
  },
  dropdown: {
    backgroundColor: Color.white,
    borderRadius: 15,
    marginVertical: 5,
  },
  button: {
    backgroundColor: Color.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: Color.white,
    fontFamily: "lexend-medium",
    fontSize: 16,
  },
});
