import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {ApiService} from '../../api/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  password_again = '';
  requiredFields = {
    email: false,
    password: false
  };
  user: User;
  code = '';
  confirmCode = '';
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.generateCaptcha();
  }

  onSubmit() {
    if (this.CheckValidCaptcha()) {
      if (this.password_again !== this.user.password) {
        alert('Please confirm the password again');
        return;
      }
      this.user.status = 'INACTIVE';
      this.api.user.signUp(this.user).promise()
        .then(rsp => {
          this.router.navigate(['/admin/login']);
        })
        .catch(e => {
          alert('Please try again');
          this.user = new User();
        });
    }
  }

  generateCaptcha() {
    this.code = '';
    this.confirmCode = '';
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let i;
    let a, b, c, d;
    for (i = 0; i < 4; i++) {
      a = alpha[Math.floor(Math.random() * alpha.length)];
      b = alpha[Math.floor(Math.random() * alpha.length)];
      c = alpha[Math.floor(Math.random() * alpha.length)];
      d = alpha[Math.floor(Math.random() * alpha.length)];
    }
    this.code = a + '' + b + '' + '' + c + '' + d;
  }

  CheckValidCaptcha() {
    const str1 = this.removeSpaces(this.code);
    const str2 = this.removeSpaces(this.confirmCode);
    if (str1 === str2) {
      return true;
    } else {
      alert('Please enter a valid captcha.');
      this.generateCaptcha();
      return false;

    }
  }

  removeSpaces(string) {
    return string.split(' ').join('');
  }

}
