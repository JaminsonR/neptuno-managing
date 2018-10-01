import { Component, OnInit, Renderer2 } from '@angular/core';
import { Big } from 'big.js';
import * as moment from 'moment';
import { Sale } from '../models/Sale';
import { Item } from '../models/Item';
import { VentaService } from '../services/ventasService/venta.service';
import { ClientesService } from '../services/ClientesService/clientes.service';
import { ProductosService } from '../services/ProductosService/producto.service';
import { Client } from '../models/Client';
import { Product } from '../models/Product';



@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

	TAX = 0.12
	sale : Sale = 
	{
	    "client_id" : " ",
	    "date" : new Date(),
	    "client_name" : " ",
	    "client_phone" : " ",
	    "client_address" : " ",
	    "items" : [ 
	        {
	            "quantity" : 0,
	            "product_id" : " ",
	            "product_name" : " ",
	            "price" : 0.00,
	            "amount" : 0.00
	        }, 
	        
	    ],
	    "subtotal" : 0.00,
	    "tax" : 0.00,
	    "total" : 0.00
	}
	date : string = moment(this.sale.date).format("DD/MM/YYYY")

	clients : Client[]
	products : Product[]
	modalText = ""



  constructor(private ventaService: VentaService, private clienteService: ClientesService, private productosService: ProductosService) { }

	add_row = function ()
	{
		if (this.sale.items[this.sale.items.length -1 ].quantity > 0)
		{
			this.sale.items.push(new Item());	
		}

		
	}

	getClients(): void {
  	this.clienteService.getClients()
  	.subscribe(response => {
  		this.clients = response.data as Client[];
  	});
  	}

  	getProducts(): void {
  	this.productosService.getProducts()
  	.subscribe(response => {
  		this.products = response.data as Product[];
  	});
  	}

	save(): void {
	if (this.sale.client_name != " " && this.sale.items.length > 0){
		this.ventaService.createSale(this.sale)
	     .subscribe((response) => {
	     	if (response.status === true){
	     		this.modalText = "Venta Guardada Exitosamente"
	     	}else{
	     		this.modalText = "No se pudo guardar la venta. Vuelva a intentarlo"
	     	}
	     },
	     (error) => {this.modalText = "No se pudo guardar la venta"});
	}
	   this.modalText = "Por favor llene todos los campos"
	 }

	clientLookUp(event: any): void {
	 	let id = event.target.value.replace(/ /g,'')
	 	for (var client of this.clients) {
	 		
	 		if (client.client_id === id) {
	 			this.sale.client_name = client.client_name
	 			this.sale.client_address = client.client_address
	 			this.sale.client_phone = client.client_phone
	 			return 	 		
	 		}
	 	}
	 	this.sale.client_name = " "
	 	this.sale.client_address = " "
	 	this.sale.client_phone = " "
	}

	productLookUp(event: any, i : number): void {
	 	let id = event.target.innerText.replace(/ /g,'')
	 	for (var product of this.products) {	 		
	 		if (product.id === id) {
	 			this.sale.items[i].product_id=event.target.innerText.replace(/ /g,'')
	 			this.sale.items[i].product_name = product.name
	 			this.sale.items[i].price = Number(product.price.$numberDecimal.toString())
	 			this.sale.items[i].amount = Number(Big(this.sale.items[i].quantity).times(this.sale.items[i].price).toString())
	 			this.updateTotals()
	 			return 	 		
	 		}
	 	}
	 	this.sale.items[i].product_name  = " "
	 	this.sale.items[i].price = 0.00

	}
	updateAmount(event:any, i: number) : void {
		let quantity = event.target.innerText
		this.sale.items[i].quantity = quantity
		this.sale.items[i].amount = Number(Big(quantity).times(this.sale.items[i].price).toString())
		this.updateTotals()
		

	}
	updateTotals() : void {
		let subtotal : Big
		let tax  : Big
		let total : Big
		for (let item of this.sale.items) {
			subtotal = Big(item.amount).plus(subtotal)
		}
		tax = subtotal.times(this.TAX)
		total = subtotal.plus(tax)
		this.sale.subtotal = Number(subtotal.toString())
		this.sale.tax = Number(tax.toString())
		this.sale.total = Number(total.toString())

	}



  ngOnInit() {
  	this.getClients();
  	this.getProducts();
	        
  }


}
