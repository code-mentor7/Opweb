import { Injectable } from '@angular/core';
import { AuthData } from './auth-data';
import { ApiService } from './api/api.service';
import { MeService } from './me.service';
import { User } from './models/user';

@Injectable()
export class AuthService {

  constructor(private api: ApiService, private me: MeService) { }

  rememberToken(token) {
    localStorage.setItem('op.token', token);
  }

  removeToken() {
    localStorage.removeItem('op.token');
  }

  getToken() {
    return localStorage.getItem('op.token');
  }

  canAutoLogin(): boolean {
    return this.getToken() !== null;
  }

  isAuthenticated(): boolean {
    return this.me.token !== null;
  }

  // autoLogin(): Promise<User> {
  //   const token = this.getToken();
  //   if (token === null) {
  //     return Promise.reject({'error': 'New user'});
  //   }
  //   this.me.setToken(token);
  //   return this.api.me.get().promise()
  //     .then(user => this.me.setUser(user))
  //     ;
  // }

  // login(auth: AuthData): Promise<User> {
  //   return this.api.authToken.post(auth).promise()
  //     .then(token => {
  //       this.me.setToken(token.token);
  //       this.rememberToken(token.token);
  //     })
  //     .then(() => this.api.me.get().promise())
  //     .then(user => this.me.setUser(user))
  //     ;
  // }

  logout(): void {
    localStorage.removeItem('op.token');
    this.me.setUser(null);
  }

}
