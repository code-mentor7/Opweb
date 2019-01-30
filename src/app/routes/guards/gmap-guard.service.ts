import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class GmapGuardService {

  ready = false;
  promise?: Promise<boolean> = null;

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.ready) {
      return Promise.resolve(true);
    }
    if (window['angularGmapReady']) {
      this.ready = true;
      return Promise.resolve(true);
    }
    if (this.promise === null) {
      this.promise = new Promise<boolean>((resolve, reject) => {
        window['angularGmapGuard'] = function() {
          this.ready = true;
          resolve(true);
        };
      });
    }
    return this.promise;
  }

}
