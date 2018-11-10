import { Injectable } from '@angular/core';
import { Client } from '../../models/Client';
import { Response } from '../../models/response';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
	private baseUrl = environment.baseUrl; // URL to web api
	private clientUrl = this.baseUrl + 'clients';

	constructor(
    private http: HttpClient) { }

  	/** GET clients from the server */
	getClients (): Observable<Response> {
	  return this.http.get<Response>(this.clientUrl)
	}

	/** POST: create new client on the server */
	createClient (client: Client): Observable<any> {
	  return this.http.post(this.clientUrl, client);
	}
}








