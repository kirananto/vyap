import React from 'react'
import { useSelector } from "react-redux";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";

export function UnAuthenticated({ children }: { children: JSX.Element }) {

  const { user, token } = useSelector(selectCredentials);

  console.log('user-test', user, token, !(user === undefined || token === undefined))

  if (!(user === undefined || token === undefined)) {
    console.log('user-test2', JSON.stringify(user), token, !(user === undefined || token === undefined))

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    window.location.replace('/home')
  }

  return children;
}