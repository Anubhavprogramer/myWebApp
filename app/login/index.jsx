import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import colors from "../../constants/Color";

export default function LoginScreen() {
  return (
    <View style={{
      backgroundColor: colors.white,
      height:'100%'
    }}>
      <Image source={require("../../assets/images/dogooo.jpeg")} 
        style={{
          width: "100%",
          height: 400
        }}
      ></Image>
      <View style={{
        padding: 20,
        display: "flex",
        alignItems: "center"
      }}>
        <Text style={{
          fontSize: 20,
          fontFamily: "lexend-ExtraBold",
          color: "Black",
          textAlign: "center"
        }}>Ready to make new Friend?</Text>
        <Text style={{
          fontSize: 18,
          fontFamily: "lexend-regular",
          textAlign: "center",
          color: colors.gray
        }}>Let's adopt the pet which you like and make there life happy again</Text>
      
        <Pressable style={{
          padding: 14,
          backgroundColor: colors.primary,
          marginTop: 50,
          width: '100%',
          borderRadius: 15
        }}>
          <Text style={{
            fontFamily: 'lexend-medium',
            fontSize: 20,
            textAlign: "center"
          }}>Get Started</Text>
        </Pressable>
      
      </View>
    </View>
  );
}
