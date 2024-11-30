import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen() {
  const params = useLocalSearchParams(); // Fetch route params
  const user = useUser(); // Current logged-in user
  const [otherUserEmail, setOtherUserEmail] = useState('');
  const [otherUserName, setOtherUserName] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  console.log(user)

  useEffect(() => {
    if (params.id) {
      fetchChatDetails();
      const unsubscribe = fetchMessages();

      return () => unsubscribe(); // Cleanup on unmount
    }
  }, [params.id]);

  useEffect(() => {
    navigation.setOptions({
      title: otherUserName || 'Chat', // Update navigation title
    });
  }, [otherUserName]);

  /**
   * Fetch other user's details from Firestore
   */
  const fetchChatDetails = async () => {
    try {
      const docRef = doc(db, 'chats', params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const chatData = docSnap.data();
        const otherUser = chatData.users.find(
          (userItem) => userItem.email !== user.user.email
        );

        if (otherUser) {
          setOtherUserEmail(otherUser.email);
          setOtherUserName(otherUser.name);
          navigation.setOptions({ title: otherUser.name || 'Chat' });
        }
      } else {
        console.error('Chat document not found.');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  /**
   * Fetch and subscribe to chat messages in real-time
   */
  const fetchMessages = () => {
    const messagesRef = collection(db, 'chats', params.id, 'Messages');
    const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(), // Handle Firestore timestamp
      }));
      setMessages(fetchedMessages);
    });

    return unsubscribe;
  };

  /**
   * Handle sending a new message
   */
  const onSend = async (newMessages = []) => {
    try {
      const message = {
        _id: newMessages[0]._id, // Unique ID for each message
        text: newMessages[0].text,
        createdAt: new Date(), // Current timestamp
        user: {
          _id: user.user.id, // User ID
          name: user.user.fullName, // User's full name
          avatar: user.user.ImageUrl || 'https://example.com/default-avatar.png', // Fallback to default avatar
        },
      };
  
      await addDoc(collection(db, 'chats', params.id, 'Messages'), message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user.user.id,
        name: user.user.fullName,
        avatar: user.user.ImageUrl, // Ensure correct property name
      }}
    />
  );
}
