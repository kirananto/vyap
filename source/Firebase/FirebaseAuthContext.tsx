import React, { createContext, useState, useEffect } from "react";
import { auth } from "./firebase";
export const AuthContext = createContext({ userPresent: false, user: null, userDataPresent: false, });
export const FirebaseAuthContext: React.FC = ({ children }) => {
  let [state, changeState] = useState<any>({
    userDataPresent: false,
    user: null,
    listener: null,
  });

  useEffect(() => {
    if (state.listener == null) {
      changeState({
        ...state,
        listener: auth.onAuthStateChanged((user: any) => {
          if (user)
            changeState((oldState: any) => ({
              ...oldState,
              userDataPresent: true,
              user: user,
            }));
          else
            changeState((oldState: any) => ({
              ...oldState,
              userDataPresent: true,
              user: null,
            }));
        }),
      });
    }
    return () => {
      if (state.listener) {
        state.listener();
      }
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
