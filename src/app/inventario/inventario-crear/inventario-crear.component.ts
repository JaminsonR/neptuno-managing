import { Component, OnInit, Inject } from "@angular/core";
import { Product } from "../../models/Product";
import { ProductosService } from "../../services/productosService/producto.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatTableDataSource,
} from "@angular/material";

@Component({
  selector: "app-inventario-crear",
  templateUrl: "./inventario-crear.component.html",
  styleUrls: ["./inventario-crear.component.css"],
})
export class InventarioCrearComponent implements OnInit {
  product: Product = {
    id: "",
    name: "",
    price: null,
    bulkPrice: null,
    isTaxable: true,
    stock: null,
    isPrime: false,
  };
  price: number;
  bulkPrice: number;
  // dataSource = new MatTableDataSource(product);
  constructor(
    private productosService: ProductosService,
    public dialogRef: MatDialogRef<InventarioCrearComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data) {
      this.product = this.data;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
      verticalPosition: "top",
    });
  }
  updateBulkPrice(): void {
    this.product.bulkPrice = Math.round(
      parseFloat(String(this.bulkPrice)) * 100
    );
  }

  updatePrice(): void {
    this.product.price = Math.round(parseFloat(String(this.price)) * 100);
  }

  forceUpperCase(): void {
    this.product.id = this.product.id.toUpperCase();
  }
  createProduct(): void {
    // FIXME: validar que el codigo sea unico y mostrar mensaje de error
    // Math.round(parseFloat(this.perItemDiscount[i]) * 100);
    if (this.data) {
      console.log(this.product); // FIXME: algo raro pasa aqui
      this.productosService.updateProduct(this.data).subscribe(
        (response) => {
          this.dialogRef.close(response.data);
        },
        (error) => {
          this.product.id = "";
          this.openSnackBar("El código ya existe, escoja otro", "cerrar");
        }
      );
    } else {
      this.productosService.createProduct(this.product).subscribe(
        (response) => {
          this.product.id = "";
          this.product.name = "";
          this.product.price = null;
          this.product.bulkPrice = null;
          this.product.isTaxable = true;
          this.product.stock = null;
          this.product.isPrime = false;
          this.dialogRef.close(response.data);
        },
        (error) => {
          this.product.id = "";
          this.openSnackBar("El código ya existe, escoja otro", "cerrar");
        }
      );
    }
  }

  salir(): void {
    this.dialogRef.close();
  }
}
