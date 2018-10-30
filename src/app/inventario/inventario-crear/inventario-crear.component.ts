import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductosService } from '../../services/productosService/producto.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-inventario-crear',
  templateUrl: './inventario-crear.component.html',
  styleUrls: ['./inventario-crear.component.css']
})
export class InventarioCrearComponent implements OnInit {
  product: Product = {
    id: '',
    name: '',
    price: null,
    taxable: true,
    stock: null,
    isPrime: false
  };
  // dataSource = new MatTableDataSource(product);
  constructor(
    private productosService: ProductosService,
    public dialogRef: MatDialogRef<InventarioCrearComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
      verticalPosition: 'top'
    });
  }

  createProduct(): void { // FIXME: validar que el codigo sea unico y mostrar mensaje de error
    this.productosService.createProduct(this.product)
     .subscribe((response) => {
      this.product.id = '';
      this.product.name = '';
      this.product.price = null;
      this.product.taxable = true;
      this.product.stock = null;
      this.product.isPrime = false;
      this.dialogRef.close(response.data);
     },
     (error) => {
        this.product.id = '';
        this.openSnackBar('El código ya existe, escoja otro', 'cerrar');
     });
  }

  salir (): void {
    this.dialogRef.close();
  }

}
