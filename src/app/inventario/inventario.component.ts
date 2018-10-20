import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../models/Product';
import { ProductosService } from '../services/productosService/producto.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Big } from 'big.js';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  animal: string;
  name: string;
  products: Product[];
  product: Product = {
    id: '',
    name: '',
    price: null,
    taxable: true,
    stock: null,
    isPrime: false
  };

  constructor(
    private productosService: ProductosService,
    public dialog: MatDialog
  ) { }

  getProductos(): void {
    this.productosService.getProducts()
     .subscribe((response) => {
       this.products = response.data;
     },
     (error) => {});
  }

  createProduct(): void {
    this.productosService.createProduct(this.product)
     .subscribe((response) => {
      this.product.id = '';
      this.product.name = '';
      this.product.price = null;
      this.product.taxable = true;
      this.product.stock = null;
      this.product.isPrime = false;
      this.products.unshift(response.data);
     },
     (error) => {});
  }

  ngOnInit() {
    this.getProductos();
  }

}
