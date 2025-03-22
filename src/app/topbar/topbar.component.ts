import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    imports: [MatToolbarModule]
})
export class TopbarComponent implements OnInit {

  constructor(
    ) { }

  ngOnInit(): void {
    //this.loginService.login();
  }

  login(): void {/*
    if (this.loginService.isLoggedIn) {
      this.loginService.logout();
    } else {
      this.loginService.login();
    }*/
  }
}
