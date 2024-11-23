import { db } from '../Config/FirebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const GetFavList = async (user) => {
    const docSnap = await getDoc(doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress));
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        await setDoc(doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress), {
            email: user?.primaryEmailAddress?.emailAddress,
            favList: []
        });
        return { email: user?.primaryEmailAddress?.emailAddress, favList: [] };
    }
};

const UpdateFavList = async (user, favorites) => {
    const docRef = doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef, {
            favList: favorites // Ensure the field name matches the one used in GetFavList
        });
    } catch (e) {
        console.log("Error updating document", e);
    }
};

export default { GetFavList, UpdateFavList };