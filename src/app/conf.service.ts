import { Injectable } from '@angular/core';
import { MeService } from './me.service';
import { User } from './models/user';

@Injectable()
export class ConfService {

  perPage = 50;
  scope_country_id: number= null;
  scope_sponsor_id: number= null;
  scope_agency_id: number= null;
  scope_product_id: number= null;
  constructor(private me: MeService) {
  }

}
