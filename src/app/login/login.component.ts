import { Component, OnInit } from '@angular/core';
import { User } from '../User'
import { UserService } from '../user.service';
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
    "last_name" : ""
	};
  constructor(private userService: UserService, private location: Location) { }


  login(): void {
  	this.userService.loginUser(this.user)
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
