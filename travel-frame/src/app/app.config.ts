import { ApplicationConfig,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from './app.intereceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AuthGuard } from './auth.guard';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { provideEffects } from '@ngrx/effects';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app'
import {getStorage, provideStorage} from '@angular/fire/storage'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDMGSCY0z8mLwsnvEkoVUid5EBSAbN5eYE",
  authDomain: "frame-travel.firebaseapp.com",
  projectId: "frame-travel",
  storageBucket: "frame-travel.appspot.com",
  messagingSenderId: "43914469166",
  appId: "1:43914469166:web:1be8d9d4a0d695eb2e24bf"
};


export const appConfig: ApplicationConfig = {
  providers: [
 
    
    provideRouter(routes), importProvidersFrom([HttpClientModule,
    provideFirebaseApp(()=>initializeApp(firebaseConfig)),
    provideStorage(()=>getStorage()),
     provideFirestore(()=> getFirestore())
  ]),
    
    { provide: HTTP_INTERCEPTORS,
        multi: true,
        useClass: AppInterceptor }, 
        provideAnimationsAsync(), 
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
         provideStore(reducers, { metaReducers }), provideAnimationsAsync(),
         
  
        
        ]

};
