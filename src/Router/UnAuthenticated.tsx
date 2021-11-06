import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";

export function UnAuthenticated({ children }: { children: JSX.Element }) {

    const { user, token } = useSelector(selectCredentials);
    const navigate = useNavigate()

    console.log('user-test', user, token, !(user === undefined || token === undefined))

    if (!(user === undefined || token === undefined)) {
      console.log('user-test2', user, token, !(user === undefined || token === undefined))

      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      navigate('/home') //TODO THis does not seem to work.
    }
  
    return children;
  }