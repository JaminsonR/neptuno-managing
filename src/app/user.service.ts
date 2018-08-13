import { Injectable } from '@angular/core';
import { USERS } from './mock-users'
import { User } from './user';
import { Response } from './response';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	private usersUrl = '/api/user/login';  // URL to web api
	private usersRegistroUrl = '/api/user/registro';

	constructor(
    private http: HttpClient) { }

  	/** GET heroes from the server */
	getUsers (): Observable<Response> {
	  return this.http.get<Response>(this.usersUrl)
	}

	/** PUT: update the hero on the server */
	updateUser (user: User): Observable<any> {
	  return this.http.post(this.usersRegistroUrl, user);
	}

}

