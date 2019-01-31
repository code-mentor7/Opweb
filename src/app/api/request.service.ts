import { Injectable } from '@angular/core';
import { RequestParams } from './request-params';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { MeService } from '../me.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RequestService {
   private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private me: MeService) { }

  observableFact(requestParams: RequestParams): Observable<Response> {
    const options: any = {};
    // if (requestParams.requestAuth) {
    //   requestParams.params({token: this.me.token});
    // }
    options.params = requestParams.requestParams;
    let httpRequest;
    if (requestParams.requestMethod === 'GET') {
      httpRequest = this.http.get(requestParams.requestUrl, options);
    } else if (requestParams.requestMethod === 'POST') {
      options.headers = this.headers;
      httpRequest = this.http.post(
        requestParams.requestUrl,
        JSON.stringify(requestParams.requestPayload),
        options
      );
    } else if (requestParams.requestMethod === 'PUT') {
      options.headers = this.headers;
      httpRequest = this.http.put(
        requestParams.requestUrl,
        JSON.stringify(requestParams.requestPayload),
        options
      );
    } else if (requestParams.requestMethod === 'DELETE') {
      options.headers = this.headers;
      httpRequest = this.http.delete(requestParams.requestUrl, options);
    }
    httpRequest = httpRequest
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
      ;
    return httpRequest;
  }

  get(): RequestParams {
    return new RequestParams(p => this.observableFact(p)).get();
  }

  post(): RequestParams {
    return new RequestParams(p => this.observableFact(p)).post();
  }

  put(): RequestParams {
    return new RequestParams(p => this.observableFact(p)).put();
  }

  delete(): RequestParams {
    return new RequestParams(p => this.observableFact(p)).delete();
  }

}
