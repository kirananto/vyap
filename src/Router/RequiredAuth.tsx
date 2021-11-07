import React from 'react'

import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";

export function RequiredAuth({ children }: { children: JSX.Element }) {

    const { user, token } = useSelector(selectCredentials);
    const navigate = useNavigate()

    if (user === undefined || token === undefined) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        navigate('/login')
    }

    return children;
}