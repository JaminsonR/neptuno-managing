import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { Response } from '../../models/response';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private baseUrl = environment.baseUrl; // URL to web api
	private productsUrl = this.baseUrl + 'products';
  constructor(
    private http: HttpClient) {}
  get (): Observable<Response> {
    return this.http.get<Response>(this.productsUrl);
  }

  create (client: Product): Observable<any> {
    return this.http.post(this.productsUrl, client);
  }
}
