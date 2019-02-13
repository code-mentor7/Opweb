import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {ApiService} from '../../api/api.service';
import {MeService} from '../../me.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];
  showDialog = false;
  selectedUser: User;
  constructor(private api: ApiService, private me: MeService) { }

  ngOnInit() {
    this.selectedUser = new User();
    this.api.user.getAll(this.me.user.user_id_num).promise()
      .then(rsp => {
        this.users = rsp.data;
      });
  }

  onEdit(user) {
    this.showDialog = true;
    Object.assign(this.selectedUser, user);
  }

  submitUser() {
    this.showDialog = false;
    this.api.user.update(this.selectedUser, this.selectedUser.user_id_num).promise()
      .then(rsp => {
        const updatedUser = _.find(this.users, user => user.user_id_num === rsp['user_id_num']);
        Object.assign(updatedUser, rsp);
      });
  }

  onCancel() {
    this.showDialog = false;
  }


}
