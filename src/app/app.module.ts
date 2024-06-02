import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArenaComponent } from './arena/arena.component';
import { FrameComponent } from './frame/frame.component';
import { FilmstripComponent } from './filmstrip/filmstrip.component';
import { EditorComponent } from './editor/editor.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from "@angular/fire/compat/auth";
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import {environment} from '../environments/environment';
import { TopbarComponent } from './topbar/topbar.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

@NgModule({
  declarations: [
    AppComponent,
    ArenaComponent,
    FrameComponent,
    FilmstripComponent,
    EditorComponent,
    TopbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  //providers: [ {provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 9099] : undefined} ],
  providers: [ {provide: USE_AUTH_EMULATOR, useValue: undefined} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
