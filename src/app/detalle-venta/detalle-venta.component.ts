import {Component, OnInit, Input } from '@angular/core';
import { Big } from 'big.js';
import * as moment from 'moment';
import { Sale } from '../models/Sale';
import { Item } from '../models/Item';
import { VentaService } from '../services/ventasService/venta.service';
import { ClientesService } from '../services/clientesService/clientes.service';
import { ProductosService } from '../services/productosService/producto.service';
import { Client } from '../models/Client';
import { Product } from '../models/Product';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {

	@Input() sale: Sale;

	  constructor(  private route: ActivatedRoute,
					  private ventaService: VentaService,
					  private location: Location,
					  private router: Router
					  ) { }
		

		backToParent(): void {
		  //const id = +this.route.snapshot.paramMap.get('id');
		  window.location.reload();


		}

  ngOnInit() {
	// this.getSale();
  }

}


