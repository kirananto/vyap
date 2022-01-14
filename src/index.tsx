import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './tailwind.css'
import { Provider } from 'react-redux'
import { InitialRouter } from './App';
import { persistor, store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
  document.body.classList.add('dark:bg-gray-900')
} else {
  document.documentElement.classList.remove('dark')
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InitialRouter />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
