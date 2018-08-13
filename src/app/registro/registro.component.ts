import { Component, OnInit } from '@angular/core';
import { User } from '../User'
import { UserService } from '../user.service';
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
    "last_name" : ""
	};
  constructor(private userService: UserService, private location: Location) { }

  goBack(): void {
  this.location.back();
}

  save(): void {
   this.userService.updateUser(this.user)
     .subscribe(() => this.goBack());
 }

  getUsers(): void {
  	this.userService.getUsers()
  	.subscribe(response => {
  		console.log(response.data as User[])
  		this.users = response.data as User[];
  	});
  }


  ngOnInit() {
  	this.getUsers();
  }

}
