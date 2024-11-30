import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import { GiftedChat } from 'react-native-gifted-chat'
import moment from 'moment/moment'

export default function ChatScreen() {
  const params = useLocalSearchParams()
  const user = useUser()
  const [otherUserEmail, setOtherUserEmail] = React.useState('');
  const [messages, setMessages] = useState([])
  const navigation = useNavigation();

  useEffect(() => {
    GetUserDetails();

    const unsubscribe = onSnapshot(collection(db, 'chats', params.id, 'Messages'), (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
       _id: doc.id,
       ...doc.data()
      }));
      setMessages(messages);
    });
  }, [])

  const GetUserDetails = async () => {
    const docRef = doc(db, 'chats', params?.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    // console.log(result);
    const otherUser = result?.users.filter(item => item.email !== user.email);
    // here other user is current owner of pet
    if (otherUser.length > 0) {
      setOtherUserEmail(otherUser[0].email);
    }
    navigation.setOptions({
      title: otherUser[0].name
    })
  }

  const onSend = async (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    newMessages[0].createdAt = moment().format("MM-DD-YYYY hh:mm:ss")
    await addDoc(collection(db, 'chats', params.id, 'Messages'),newMessages[0])
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showUserAvatar={true}
      // add it or remove it to show image or not
      user={{
        _id: user.user.id,
        name: user.user.fullName,
        avatar: user.user.userImage
      }}
    />
  )
}