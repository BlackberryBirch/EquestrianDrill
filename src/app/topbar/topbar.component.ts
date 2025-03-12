import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    standalone: false
})
export class TopbarComponent implements OnInit {

  constructor(
    public loginService: LoginService    
    ) { }

  ngOnInit(): void {
    this.loginService.login();
  }

  login(): void {
    if (this.loginService.isLoggedIn) {
      this.loginService.logout();
    } else {
      this.loginService.login();
    }
  }
}
