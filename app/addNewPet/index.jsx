import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import Color from "../../constants/Color";
import { TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";

export default function AddnewPet() {
  const navigation = useNavigation();

  const [formData, setFormData] = React.useState();
  const [Gender, setGender] = React.useState();
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dog");

  useEffect(() => {
    navigation.setOptions({
      title: "Add new Pet",
    });
    GetCategories();
  }, []);

  const GetCategories = async () => {
    try {
      const snapShot = await getDocs(collection(db, "Category"));
      const categories = [];
      snapShot.forEach((doc) => {
        categories.push(doc.data());
      });
      setCategory(categories);
    //   console.log(categories);
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

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <ScrollView>
        <Image
          source={require("../../assets/images/addPet.png")}
          style={{
            width: "100%",
            height: 200,
            resizeMode: "contain",
            opacity: 0.5,
            borderRadius: 10,
          }}
        />

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
          <Text style={styles.inputContainer}>age*</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Pet age"
            onChangeText={(value) => handleInputChange("age", value)}
          />
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            borderRadius: 15,
            marginVertical: 5,
          }}
        >
          <Picker
            style={[styles.inputContainer, { fontFamily: "lexend-regular" }]}
            selectedValue={Gender}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue), handleInputChange("sex", itemValue);
            }}
          >
            <Picker.Item
              style={{ fontFamily: "lexend-regular" }}
              label="Male"
              value="male"
            />
            <Picker.Item
              style={{ fontFamily: "lexend-regular" }}
              label="Female"
              value="female"
            />
          </Picker>
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            borderRadius: 15,
            marginVertical: 5,
          }}
        >
          <Picker
            style={[styles.inputContainer, { fontFamily: "lexend-regular" }]}
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCategory(itemValue),
                handleInputChange("category", itemValue);
            }}
          >
            {category.map((category, index) => (
              <Picker.Item
                key={index}
                style={{ fontFamily: "lexend-regular" }}
                label={category.animal}
                value={category.animal}
              />
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
            multiline={true}
            placeholder="My Dog is Cute"
            onChangeText={(value) => handleInputChange("about", value)}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              color: Color.white,
              fontFamily: "lexend-medium",
              fontSize: 16,
            }}
          >
            Submit
          </Text>
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
    // color: Color.gray,
  },
  inputField: {
    padding: 15,
    fontFamily: "lexend-regular",
    // borderWidth: 1,
    // borderColor: Color.primary,
    backgroundColor: Color.white,
    borderRadius: 10,
    marginVertical: 3,
  },
  box: {
    marginVertical: 2,
  },
  button: {
    backgroundColor: Color.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
});
