// tabla example
// https://stackblitz.com/edit/angular-axjzov-xc4kbp?file=app%2Ftable-filtering-example.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/Product';
import { ProductosService } from '../services/productosService/producto.service';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { InventarioCrearComponent } from './inventario-crear/inventario-crear.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent implements OnInit {
  products: Product[];
  displayedColumns: string[] = ['name', 'id', 'price', 'stock', 'isPrime', 'taxable'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private productosService: ProductosService,
    public dialog: MatDialog
  ) { }

  getProductos(): void {
    this.productosService.getProducts()
     .subscribe((response) => {
       this.products = response.data;
      this.dataSource = new MatTableDataSource(this.products);
     },
     (error) => {});
  }

  ngOnInit() {
    this.getProductos();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InventarioCrearComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.products.unshift(result);
        this.dataSource = new MatTableDataSource(this.products);
      }
    });
  }
}
