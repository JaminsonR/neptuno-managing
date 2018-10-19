import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { User } from '../../models/User';
import { Response } from '../../models/response';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http , HttpModule} from '@angular/http';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements HttpInterceptor{
	private baseUrl = environment.baseUrl; // URL to web api
	private usersUrl = this.baseUrl + 'user/';
  private loginUrl = this.baseUrl + 'login/auth'


	constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
    ) { }

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
	loginUser (id: String, password: String): Observable<any> {
	  return this.http.post(this.loginUrl, { id, password });
	}

	/** Authenticate user */
	isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
	}
	
	/** Adds auth headers to requests */
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');		
		req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
		});
		return next.handle(req);
  }


}


