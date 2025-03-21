import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryComponent } from 'firebaseui-angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FirebaseuiAngularLibraryComponent]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    //this.dialogRef.close();
    console.log("success");
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    //this.dialogRef.close();
    console.log("failure");
  }
}
