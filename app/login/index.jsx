import { View, Text, Image, Pressable } from "react-native";
import React, { useCallback } from "react";
import colors from "../../constants/Color";
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'


export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

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
      
        <Pressable
        onPress={onPress}
        style={{
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
