import { Injectable } from '@angular/core';
import { Sale } from '../../models/Sale';
import { Response } from '../../models/response';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
	private baseUrl = environment.baseUrl; // URL to web api
	private salessUrl = '/api/sales';  

	constructor(
    private http: HttpClient) { }

  	/** GET sales from the server */
	getSales (): Observable<Response> { 
	  return this.http.get<Response>(this.salessUrl)
	}

	/** POST: create new sale on the server */
	createSale (sale: Sale): Observable<any> {
	  return this.http.post(this.salessUrl, sale);
	}
}








