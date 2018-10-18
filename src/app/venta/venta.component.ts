import { Component, OnInit, Renderer2, Inject, TemplateRef, ViewChild   } from '@angular/core';
import { Big } from 'big.js';
import * as moment from 'moment';
import { Sale } from '../models/Sale';
import { Item } from '../models/Item';
import { VentaService } from '../services/ventasService/venta.service';
import { ClientesService } from '../services/clientesService/clientes.service';
import { ProductosService } from '../services/productosService/producto.service';
import { Client } from '../models/Client';
import { Product } from '../models/Product';
import {MatDialog} from "@angular/material";




@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

	@ViewChild('successDialog') successDialog: TemplateRef<any>
	@ViewChild('failureDialog') failureDialog: TemplateRef<any>
	@ViewChild('incompleteDialog') incompleteDialog: TemplateRef<any>

	TAX = 0.12
	sale : Sale = 
	{
		"_id" : undefined,
	    "client_id" : " ",
	    "date" : new Date().toString(),
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
		"total" : 0.00,
		"status" : 0,
		"due_date" : " "
	}
	date : string = moment(new Date(this.sale.date)).format("DD/MM/YYYY")

	clients : Client[]
	products : Product[]
	modalText = ""
	statuses: any[] = [
		{ "id":1, "label": "Por cobrar"},
		{ "id":2, "label": "Cobrada"},
		{ "id":3, "label": "Vencida"}
	]
  constructor(private ventaService: VentaService, private clienteService: ClientesService, private productosService: ProductosService, private dialog: MatDialog) { }

	add_row = function ()
	{
		if (this.sale.items[this.sale.items.length -1 ].quantity > 0)
		{
			this.sale.items.push(new Item());	
		}

		
	}
	openDialog(dialog :TemplateRef <any>) {
    //const dialogConfig = new MatDialogConfig();
    this.dialog.open(dialog);
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

  	backToParent(): void {
		  //const id = +this.route.snapshot.paramMap.get('id');
		  window.location.replace('../resumen_ventas');
	}

	save(): void {
	if (this.sale.client_name != " " && this.sale.items.length > 0 && this.sale.subtotal > 0 && this.sale.status > 0 && this.sale.due_date!= " " && new Date(this.sale.due_date).getTime()  >= new Date().getTime() ){
		this.sale.items = this.cleanItems(this.sale.items)
		this.sale.client_id = this.sale.client_id.replace(/ /g,'')
		this.ventaService.createSale(this.sale)
	     .subscribe((response) => {
	     	console.log(response)
	     	if (response.status === true){
				this.openDialog(this.successDialog)
	     	}else{
				this.openDialog(this.failureDialog)

			 }
	     },
	     (error) => {
			 this.openDialog(this.failureDialog)
			});
		return
	}
	   this.openDialog(this.incompleteDialog)
	 }

	 cleanItems(items: Item[]): Item[] {
		 let clenseItems : Item[] = []
		 for (let item of items){
			if (item.amount > 0){
				clenseItems.push(item)
			}
		 }
		return clenseItems
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
	 			if ( ! this.sale.items[i].quantity ) {
	 				this.sale.items[i].quantity = 0.00
	 			}
	 			this.sale.items[i].product_id=event.target.innerText.replace(/ /g,'')
	 			this.sale.items[i].product_name = product.name
	 			this.sale.items[i].price = product.price
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
		if ( ! this.sale.items[i].price) {
	 				this.sale.items[i].price = 0.00
	 			}

		this.sale.items[i].quantity = quantity
		this.sale.items[i].amount = Number(Big(quantity).times(this.sale.items[i].price).toString())
		this.updateTotals()
		

	}
	updateTotals() : void {
		let subtotal : Big = Big(0.00)
		let tax  : Big = Big(0.00)
		let total : Big = Big(0.00)
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
