
import React, { useEffect, useState } from "react";
import "./old.css";

import { BrowserRouter as Router } from "react-router-dom";
import RouterComp from "./RouterComp";
import { useDispatch, useSelector } from 'react-redux';
import ServiceWorkerIntegration from "./ServiceWorkerIntegration";
import { IntlProvider } from 'react-intl';
import { defaultUserInterfaceLanguage, IntlMessages } from './models/languageModel';
import enMessages from './i18n/en.json'
import mlMessages from './i18n/ml.json'
import { selecti18nConfig } from "./i18nSlice";
import { setDarkMode } from "./Pages/Login/credentialsSlice";

const messages: IntlMessages = {
  en: enMessages,
  ml: mlMessages
};

export const InitialRouter = () => {

  const userInterfaceLanguage = useSelector(selecti18nConfig).language

  const dispatch = useDispatch()

  console.log('userInterfaceLanguage', userInterfaceLanguage)

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      dispatch(setDarkMode(true))
    } else {
      dispatch(setDarkMode(false))
    }
  }, [])

  return (
    <IntlProvider locale={userInterfaceLanguage} messages={messages[userInterfaceLanguage]} defaultLocale={defaultUserInterfaceLanguage}>
      <div className="app-background dark:bg-gray-800">
        <ServiceWorkerIntegration />
        <Router>
          <RouterComp />
        </Router>
      </div>
    </IntlProvider>
  );
};
