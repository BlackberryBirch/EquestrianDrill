import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import {firebase, firebaseui, FirebaseuiAngularLibraryService, FirebaseUIModule} from 'firebaseui-angular';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginAttempted=false;
  isLoggedIn=false;
  uid="";
  displayName="";

  constructor(private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
              private angularFireAuth: AngularFireAuth) { 
    this.angularFireAuth.authState.subscribe(res => {
      if (res) {
        this.isLoggedIn=true;
        this.uid = res.uid;
        this.displayName = res.displayName ?? "";
        console.log(JSON.stringify(res));
        /*
        if (this.dialogRef) {
          this.dialogRef.close();
          this.dialogRef=null;
        }*/
      } else {
        this.isLoggedIn=false;
        this.uid="";
        this.displayName="";
        console.log(JSON.stringify(res));
      }
    });
  }

  login(): void { /*
    if (!this.dialogRef) {
      this.loginAttempted=true;
      if (!this.isLoggedIn) {
        this.dialogRef = this.dialog.open(LoginComponent, {
          //width: '250px'
        });
      }
    }*/
  }

  logout() {
    this.angularFireAuth.signOut();
    this.isLoggedIn=false;
    this.uid="";
    this.displayName="";
  }
}
