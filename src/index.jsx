import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import globalEn from './Translations/en/global.json';
import globalEs from './Translations/es/global.json';


const root = ReactDOM.createRoot(document.getElementById('root'));

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  resources: {
    es: {
      global: globalEs
    },
    en: {
      global: globalEn
    },
  }, 
});


root.render(
    <I18nextProvider i18n={i18next}>
      <Root/>
    </I18nextProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
