import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable()
export class MeService {
  user?: User = null;
  token?: string = null;

  constructor() { }

  setToken(token: string): void {
    this.token = token;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
