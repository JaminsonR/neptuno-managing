import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Response } from '../../models/response';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	private baseUrl = environment.baseUrl; // URL to web api
	private usersUrl = this.baseUrl + 'user/';  


	constructor(
    private http: HttpClient) { }

  	/** GET users from the server */
	getUsers (): Observable<Response> { 
	  return this.http.get<Response>(this.usersUrl)
	}

	/** POST: create the user on the server */
	createUser (user: User): Observable<any> {
		let url = this.usersUrl + 'registro';
	  return this.http.post(url, user);
	}


	/** POST: login the user on the server */
	loginUser (user: User): Observable<any> {
	  return this.http.post(this.usersUrl, user);
	}

	/** Authenticate user */
	isAuthenticated() {}

}


