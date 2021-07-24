import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLUTuXadIl9mzgJ_aTXNvI6vnF0Xumf5U",
  authDomain: "vyap-4b600.firebaseapp.com",
  projectId: "vyap-4b600",
  storageBucket: "vyap-4b600.appspot.com",
  messagingSenderId: "266136552315",
  appId: "1:266136552315:web:63b6edd09acf09c76d73de",
  measurementId: "G-2H75LFYP0F",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user: any, additionalData: any) => {
  console.log("Generating User Document...");
  if (!user) return;
  const userRef = await firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData,
      });
      console.log("...finished generating document");
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid: any) => {
  console.log("Fetching User Document...");
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    const data = userDocument.data()
    console.log("...finished fetching User Document: ", data);
    if(!data) {
        return null
    }
    return {
      uid,
      ...data,
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
