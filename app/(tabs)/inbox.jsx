import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { FlatList } from 'react-native';
import Useritem from '../../components/Inbox/Useritem';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      getUserList();
    }
  }, [user]);

  const getUserList = async () => {
    setLoading(true);
    const q = query(
      collection(db, 'chats'),
      where('userIDs', 'array-contains', user?.primaryEmailAddress?.emailAddress)
    );

    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      setUserList((prevList) => [...prevList, { docId: doc.id, ...doc.data() }]);
    });

    setLoading(false);
  };

  const MapOtherUserList = () => {
    // Remove setUserList([]) to prevent infinite re-renders
    // setUserList([]);
    if (!userList || userList.length === 0) return [];
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(
        (u) => u.email !== user?.primaryEmailAddress?.emailAddress
      );
      const result = {
        docId: record.docId,
        ...otherUser,
      };
      list.push(result);
    });
    return list;
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'lexend-regular',
        }}
      >
        Inbox
      </Text>

      <FlatList
        data={MapOtherUserList()}
        keyExtractor={(item) => item.docId}
        refreshing={Loading}
        onRefresh={getUserList}
        style={{
          marginTop: 20,

        }}
        renderItem={({ item }) => <Useritem userInfo={item} />}
      />
    </View>
  );
}
