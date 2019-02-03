import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AuthData } from '../../auth-data';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email = '';
  password = '';
  inputFocused = new EventEmitter<boolean>();
  requiredFields = {
    email: false,
    password: false
  };
  @Output() login = new EventEmitter<AuthData>();
  @Input() loginFail: boolean;

  constructor() { }

  onSubmit() {
    if (!this.email || !this.password) {
      if (!this.email) {
        this.requiredFields.email = true;
      }
      if (!this.password) {
        this.requiredFields.password = true;
      }
    } else {
      this.login.emit({email: this.email, password: this.password});
    }
  }

  ngOnInit() {
  }

}
