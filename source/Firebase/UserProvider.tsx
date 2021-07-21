import React, { createContext, useState, useEffect } from "react";
import { auth, generateUserDocument, getUserDocument } from "./firebase";

export const UserContext = createContext({
  user: undefined,
  profile: undefined,
  isSigningUp: false,
});

export const signup = async ({ email, password, ...additionalFields }: any) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    const newUserDoc = await generateUserDocument(user, additionalFields);
    return { success: true, user: newUserDoc };
  } catch (error) {
    console.log("Error Signing up with email and password");
    return { success: false, error: error };
  }
};

export const signout = async () => {
  await auth.signOut();
};

function UserProvider(props: any) {
  const [state, setState] = useState<any>({
    user: undefined,
    profile: undefined,
  });

  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    console.log("Starting User State: ", state);

    auth.onAuthStateChanged(async (userAuth: any) => {
      console.log("User State changing...", userAuth);
      setState({
        user: userAuth,
        profile: {},
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      console.log("Trying to get profile. Are we signing up?", isSigningUp);
      if (state.user && !isSigningUp) {
        const profile = await getUserDocument(state.user.uid);
        console.log("...changed User State got new profile", profile);
        setState((s: any) => ({
          ...s,
          profile,
        }));
      }
    })();
  }, [state.user, isSigningUp]);

  return (
    <UserContext.Provider value={{ ...state, isSigningUp, setIsSigningUp }}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserProvider;
