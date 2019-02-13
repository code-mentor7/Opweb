import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import {MeService} from '../../me.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private me: MeService) { }

  ngOnInit() {
  }

  logout($event): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.auth.logout();
    this.router.navigate(['admin/login']);
  }

}
