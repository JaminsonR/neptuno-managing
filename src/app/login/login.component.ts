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

  user: User = {
    "id" : "",
    "password" : "",
    "first_name" : "",
    "middle_name" : "",
    "family_name" : "",
    "last_name" : "",
    "email" : ""
	};
  constructor(private authenticationService: AuthenticationService, private location: Location) { }


  login(): void {
  	this.authenticationService.loginUser(this.user)
  	.subscribe(response => {
  		if (response.status === 'success'){
  			this.location.go('/registro');
  			window.location.reload();
  		} else{
  			window.location.reload();
  		}
  		
  	});
  }


  ngOnInit() {
  	
  }

}
