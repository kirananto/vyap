import React, { Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import PageNotFound from '../Pages/404NotFound'

import { RequiredAuth } from './RequiredAuth'
import { UnAuthenticated } from './UnAuthenticated'
import { axiosClient } from '../API/apiClient'
import { logOutAPI } from '../API/login.axios'
import { clearAll } from '../Pages/ChatView/chatListSlice'
import { selectCredentials, setCredentials } from '../Pages/Login/credentialsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { routes } from './routes'
import FallBackUI from './FallBackUI'

function RouterComp() {

    const { token } = useSelector(selectCredentials)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const UNAUTHORIZED = 401
        const FORBIDDEN = 403
        axiosClient.interceptors.response.use(
            response => response,
            error => {
                const { status } = error.response
                if (status === UNAUTHORIZED || status === FORBIDDEN) {
                    if(token) {
                        logOutAPI(token!)
                    }
                    dispatch(setCredentials({ user: undefined, token: undefined }))
                    navigate('/login')
                    dispatch(clearAll())
                }
                return Promise.reject(error)
            }
        )
    }, [dispatch, navigate, token])

    return (
        <Routes>
            {routes.map(route => <Route
                path={route.path}
                key={route.path}
                element={<Suspense fallback={<FallBackUI />}>
                    {route.requireAuth ? (<RequiredAuth><route.Component /></RequiredAuth>) : (<UnAuthenticated><route.Component /></UnAuthenticated>)}
                </Suspense>}
            />)}
            <Route element={<PageNotFound />} />
        </Routes>
    )
}

export default RouterComp