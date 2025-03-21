import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { USE_EMULATOR as USE_AUTH_EMULATOR, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { FirebaseUIModule, firebaseui, firebase } from 'firebaseui-angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'redirect',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    /*{
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID */
  ],
  immediateFederatedRedirect: false,
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, FirebaseUIModule.forRoot(firebaseUiAuthConfig)),
        { provide: USE_AUTH_EMULATOR, useValue: undefined },
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
