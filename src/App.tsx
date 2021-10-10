
import React, { useState } from "react";
import "./old.css";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { useSelector } from 'react-redux';
import ServiceWorkerIntegration from "./ServiceWorkerIntegration";
import { IntlProvider } from 'react-intl';
import { defaultUserInterfaceLanguage, IntlMessages } from './models/languageModel';
import enMessages from './i18n/en.json'
import mlMessages from './i18n/ml.json'
import { selecti18nConfig } from "./i18nSlice";

const messages: IntlMessages = {
  en: enMessages,
  ml: mlMessages
};

export const InitialRouter = () => {

  const userInterfaceLanguage = useSelector(selecti18nConfig).language

  console.log('userInterfaceLanguage', userInterfaceLanguage)

      return (
      <IntlProvider locale={userInterfaceLanguage} messages={messages[userInterfaceLanguage]} defaultLocale={defaultUserInterfaceLanguage}>
        <div className="app-background dark:bg-gray-800">
          <ServiceWorkerIntegration />
          <Router>
            <Routes />
          </Router>
        </div>
    </IntlProvider>
  );
};
