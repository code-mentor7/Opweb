import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api/api.service';
import {MeService} from '../../me.service';
import {Loan} from '../../models/loan';
import {StockInventory} from '../../models/stock_inventory';
import * as _ from 'lodash';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  loans: Loan[];
  inventories: StockInventory[];
  showDialog = false;
  selectedInventory: StockInventory;
  quantity = 0;

  constructor(private api: ApiService, private me: MeService) { }

  ngOnInit() {
    this.selectedInventory = new StockInventory();
    if (this.me.user.client_id === 'ADMIN') {
      this.api.loan.getAll().promise()
        .then(rsp => {
          this.loans = rsp;
        });
    } else {
      this.api.loan.getLoan(this.me.user.client_id).promise()
        .then(rsp => {
          this.loans = rsp;
        });
    }

    this.api.inventory.getAll().promise()
      .then(rsp => this.inventories = rsp);
  }

  onTakeDown(inventory) {
    this.showDialog = true;
    Object.assign(this.selectedInventory, inventory);
  }

  onSubtract() {
    const dif = this.selectedInventory.quantity - this.quantity;
    if (this.quantity <= 0 || dif <= 0) {
      alert('Quantity can\'t be less than 0');
      this.showDialog = false;
      this.quantity = 0;
      return;
    }
    const data = {
      quantity: dif
    };
    this.api.loan.updateInventory(data, this.selectedInventory.inventory_id_num).promise()
      .then(rsp  => {
        const updatedIV = _.find(this.inventories, iv => iv.inventory_id_num === rsp['inventory_id_num']);
        Object.assign(updatedIV, rsp);
        const newLoanData = new Loan();
        newLoanData.client_id = this.me.user.client_id;
        newLoanData.quantity = this.selectedInventory.quantity - rsp['quantity'];
        newLoanData.price = rsp['price'];
        newLoanData.fee = rsp['fee'];
        newLoanData.status = rsp['status'];
        newLoanData.feedcode = rsp['feedcode'];
        this.api.loan.addLoan(newLoanData).promise()
          .then(_rsp => {
            this.loans = _rsp;
          });
      });
    this.showDialog = false;
    this.quantity = 0;
  }

  onCancel() {
    this.showDialog = false;
    this.quantity = 0;
  }

}
