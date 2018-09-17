import { Component, OnInit } from '@angular/core';
import { User } from '../models/User'
import { AuthenticationService } from '../services/authenticationService/authentication.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  users: User[] ;
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

  goBack(): void {
  this.location.back();
}

  save(): void {
   this.authenticationService.createUser(this.user)
     .subscribe(() => this.goBack());
 }

  getUsers(): void {
  	this.authenticationService.getUsers()
  	.subscribe(response => {
  		console.log(response.data as User[])
  		this.users = response.data as User[];
  	});
  }


  ngOnInit() {
  	this.getUsers();
  }

}
