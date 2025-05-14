import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-db355","appId":"1:425239807067:web:ed9890d47729287fe8ab7e","storageBucket":"simple-crm-db355.firebasestorage.app","apiKey":"AIzaSyAooaZQah3xtl_uiiLTsA4TXUPrAkrRfmU","authDomain":"simple-crm-db355.firebaseapp.com","messagingSenderId":"425239807067"})), provideFirestore(() => getFirestore()),]
};
