import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '../auth-data';
import { AuthService } from '../auth.service';
import { AuthGuardService } from '../routes/guards/auth-guard.service';
import {ApiService} from '../api/api.service';
import {MeService} from '../me.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFail = false;

  constructor(private auth: AuthService,
              private authGuard: AuthGuardService,
              private router: Router,
              private api: ApiService,
              private me: MeService) { }

  onLogin(auth: AuthData) {
    this.api.userLogin.post(auth).promise()
      .then(rsp => {
        if (rsp.data) {
          this.loginFail = false;
          this.auth.rememberToken('loggedIn');
          this.me.setUser(rsp.data[0]);
          this.router.navigate(['admin/dashboard']);
        } else {
          this.loginFail = true;
          this.auth.removeToken();
          this.me.setUser(null);
          this.router.navigate(['admin/login']);
        }
      })
      .catch(e => {
        this.loginFail = true;
        this.auth.removeToken();
        this.me.setUser(null);
        this.router.navigate(['admin/login']);
      });
  }

  ngOnInit() {
  }

}
