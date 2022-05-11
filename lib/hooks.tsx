import { firestore } from "./firebase";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { withRouter, NextRouter, useRouter } from "next/router";
import {
  useDocument,
  useDocumentData,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";

export function UseUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);

  return { user, username };
}

export async function GetUserID() {
  const router = useRouter();
  // const getUID = async () => {
  // username from URL
  const userName = router.query.profileID;
  // reference that username in firestore usernames/username
  const userIDref = await firestore.collection("usernames").doc(userName);
  // userID = usernames/userName/UID
  const [userID] = await useDocumentData(userIDref);
  // console.log(userID.uid);

  // const someValue
  // reference to users/userID
  const ref = await firestore.collection("users").doc(userID.uid);
  // value = users/userID/data
  const [value, loading, error] = await useDocumentData(ref);

  // const someValue = await someFunction()

  return { value };
}
