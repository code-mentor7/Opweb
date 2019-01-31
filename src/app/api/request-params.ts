import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Response } from '@angular/http';
import {assign} from 'rxjs/util/assign';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

function buildUrl(urlTempl: string, params: string[]) {
  // Example usage:
  // buildUrl('/users/{}', [userId])
  // buildUrl('/lists/{}/members/{}', [listName, userId])

  const
  chunks = urlTempl.split('{}');

  let url = '';
  chunks.forEach((c, i) => {
    url += c;
    if (i < params.length) {
      url += encodeURIComponent(params[i]);
    }
  });
  return url;

}

export class RequestParams {
  requestMethod: Method;
  requestUrl: string;
  requestPayload: any;
  // requestFile: File;
  requestParams: any;
  requestAuth: boolean;

  constructor(private observableFact: (r: RequestParams) => Observable<Response>) {
    this.requestParams = {};
    this.requestAuth = false;
  }

  get(): RequestParams {
    this.requestMethod = 'GET';
    return this;
  }

  post(): RequestParams {
    this.requestMethod = 'POST';
    return this;
  }

  put(): RequestParams {
    this.requestMethod = 'PUT';
    return this;
  }

  delete(): RequestParams {
    this.requestMethod = 'DELETE';
    return this;
  }

  url(urlTempl: string, ...params: string[]) {
    this.requestUrl = buildUrl(urlTempl, params);
    return this;
  }

  params(params: any): RequestParams {
    assign(this.requestParams, params);
    return this;
  }

  filter(params: any): RequestParams {
    return this.params({filter: JSON.stringify(params)});
  }

  payload(payload: any): RequestParams {
    this.requestPayload = payload;
    return this;
  }

  sort(field: string, desc: boolean = false): RequestParams {
    if (desc) {
      field = '-' + field;
    }
    return this.params({sort: field});
  }

  page(page: number): RequestParams {
    return this.params({page: page});
  }

  all(): RequestParams {
    return this.params({o_all: 'true'});
  }

  auth(): RequestParams {
    this.requestAuth = true;
    return this;
  }

  promise(): Promise<any> {
    return this.observableFact(this).toPromise();
  }

  observable(): Observable<Response> {
    return this.observableFact(this);
  }

}
