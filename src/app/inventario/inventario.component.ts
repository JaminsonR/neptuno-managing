// tabla example
// https://stackblitz.com/edit/angular-axjzov-xc4kbp?file=app%2Ftable-filtering-example.ts

import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "../models/Product";
import { ProductosService } from "../services/productosService/producto.service";
import { MatDialog, MatTableDataSource, MatSort } from "@angular/material";
import { InventarioCrearComponent } from "./inventario-crear/inventario-crear.component";

@Component({
  selector: "app-inventario",
  templateUrl: "./inventario.component.html",
  styleUrls: ["./inventario.component.css"],
})
export class InventarioComponent implements OnInit {
  products: Product[];
  displayedColumns: string[] = [
    "name",
    "id",
    "price",
    "stock",
    "isPrime",
    "isTaxable",
    "existence",
    "delete",
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private productosService: ProductosService,
    public dialog: MatDialog
  ) {}

  getProductos(): void {
    this.productosService.getProducts().subscribe(
      (response) => {
        this.products = response.data;
        this.dataSource = new MatTableDataSource(this.products);
      },
      (error) => {}
    );
  }

  modifyExistence(id, amount): void {
    // const self = this;
    // this.productosService.modifyExistence({ id, amount }).subscribe(
    //   response => {
    //     console.log(response);
    //     if (response.state) {
    //       // this.dataSource = new MatTableDataSource(this.products);
    //     }
    //   },
    //   error => {}
    // );
  }

  openModifyDialog(product): void {
    const dialogRef = this.dialog.open(InventarioCrearComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        console.log(result);
        // this.products.unshift(result);
        // this.dataSource = new MatTableDataSource(this.products);
      }
    });
    // console.log(product);
  }

  ngOnInit() {
    this.getProductos();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InventarioCrearComponent, null);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.products.unshift(result);
        this.dataSource = new MatTableDataSource(this.products);
      }
    });
  }
}
