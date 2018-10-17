import { Component, OnInit } from '@angular/core';
import { User } from '../models/User'
import { AuthenticationService } from '../services/authenticationService/authentication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public id: String;
  public password: String;

  constructor(private authenticationService: AuthenticationService, private location: Location) { }


login(): void {
  this.authenticationService.loginUser(this.id, this.password)
      .subscribe(response => {
        console.log(response);
        if (response.state) {
          localStorage.setItem('token', response.data);
          this.location.go('/registro');
          window.location.reload();
        } else {
          // window.location.reload();
          // mostrar mensaje de error
        }
      });
  }


  ngOnInit() {

  }

}
