import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api/api.service';
import {MeService} from '../../me.service';
import {Order} from '../../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[];
  constructor(private api: ApiService, private me: MeService) { }

  ngOnInit() {
    this.api.order.getAll().promise()
      .then(rsp => this.orders = rsp);
  }

}
