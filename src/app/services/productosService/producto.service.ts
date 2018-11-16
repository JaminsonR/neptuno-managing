import { Injectable } from "@angular/core";
import { Product } from "../../models/Product";
import { Response } from "../../models/response";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  private baseUrl = environment.baseUrl; // URL to web api
  private productUrl = this.baseUrl + "products";

  constructor(private http: HttpClient) {}

  /** GET products from the server */
  getProducts(): Observable<Response> {
    return this.http.get<Response>(this.productUrl);
  }

  /** POST: create new product on the server */
  createProduct(product: Product): Observable<any> {
    return this.http.post(this.productUrl, product);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.post(this.productUrl + `/${product.id}`, product);
  }
}
