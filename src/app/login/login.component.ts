import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
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
