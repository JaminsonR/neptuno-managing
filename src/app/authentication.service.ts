import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Response } from './response';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	private usersUrl = '/api/user/login';  // URL to web api
	private usersRegistroUrl = '/api/user/registro';

	constructor(
    private http: HttpClient) { }

  	/** GET user from the server */
	getUsers (): Observable<Response> {
	  return this.http.get<Response>(this.usersUrl)
	}

	/** POST: create the user on the server */
	updateUser (user: User): Observable<any> {
	  return this.http.post(this.usersRegistroUrl, user);
	}


	/**login the user on the server */
	loginUser (user: User): Observable<any> {
	  return this.http.post(this.usersUrl, user);
	}

	/** Authenticate user */
	isAuthenticated() {}

}


