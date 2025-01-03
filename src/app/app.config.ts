import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { provideHighlightOptions } from 'ngx-highlightjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(),
    provideAnimationsAsync(), 
    provideFirebaseApp(() => 
      initializeApp(
        { "projectId"         : "my-portfolio-bba4f"
        , "appId"             : "1:807570416077:web:7a4f562fdaa7e76df32484"
        , "storageBucket"     : "my-portfolio-bba4f.appspot.com"
        , "apiKey"            : "AIzaSyBgD8T9IyJix4T8j4Uc0h4ZC9fiCM5pX2c"
        , "authDomain"        : "my-portfolio-bba4f.firebaseapp.com"
        , "messagingSenderId" : "807570416077"
        , "measurementId"     : "G-0N8GKVP63Z"
        })
    ), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml'),
        haskell: () => import('highlight.js/lib/languages/haskell'),
        python: () => import('highlight.js/lib/languages/python')
      }
    })
  ]
};
