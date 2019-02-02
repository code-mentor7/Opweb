import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api/api.service';
import {MeService} from '../../me.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;
  constructor(private api: ApiService, private me: MeService) { }

  ngOnInit() {

  }
}
