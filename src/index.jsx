import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import globalEn from './Translations/en/global.json';
import globalEs from './Translations/es/global.json';


const root = ReactDOM.createRoot(document.getElementById('root'));
const myStorage = window.localStorage;
const navLanguage = navigator.language.slice(0,2);

if(!myStorage.getItem('language')){
  if(navLanguage === 'es' || navLanguage === 'en'){
    myStorage.setItem('language', `${navLanguage}`)
  }
  else{
    myStorage.setItem('language', `en`)
  }
}



i18next.init({
  interpolation: { escapeValue: false },
  lng: myStorage.getItem('language'),
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
