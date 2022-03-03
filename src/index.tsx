import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import './tailwind.css'
import { Provider } from 'react-redux'
import { InitialRouter } from './App'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import { init } from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

if(import.meta.env.MODE !== 'development') {
    init({
        dsn: 'https://ccaf8e0e8a37441a8aae84226c909553@o1147462.ingest.sentry.io/6217762',
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    })
}

if(!localStorage.theme) {
    localStorage.setItem('theme', 'dark')
}

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark:bg-slate-900')
} else {
    document.documentElement.classList.remove('dark')
}

render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <InitialRouter />
            </PersistGate>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
)

if (import.meta.hot) {
    import.meta.hot.accept()
}