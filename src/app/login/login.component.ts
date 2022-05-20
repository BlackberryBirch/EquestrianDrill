import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    this.dialogRef.close();
    console.log("success");
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    this.dialogRef.close();
    console.log("failure");
  }
}
