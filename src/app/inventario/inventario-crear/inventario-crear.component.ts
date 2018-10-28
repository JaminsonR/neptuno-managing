import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductosService } from '../../services/productosService/producto.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  constructor(
    private productosService: ProductosService,
    public dialogRef: MatDialogRef<InventarioCrearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
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
      this.dialogRef.close(response.data);
     },
     (error) => {});
  }

  salir (): void {
    this.dialogRef.close();
  }

}
