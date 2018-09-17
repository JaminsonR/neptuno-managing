import { Component, OnInit, Renderer2 } from '@angular/core';
import { Big } from 'big.js';
import * as moment from 'moment';
import { Sale } from '../models/Sale';
import { Item } from '../models/Item';
import { VentaService } from '../services/ventasService/venta.service';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {


	sale : Sale = 
	{
	    "client_id" : "0912345685001",
	    "date" : new Date(),
	    "client_name" : "Cliente B",
	    "client_phone" : "0969216546",
	    "client_address" : "Sauces 4 mz 377 v12",
	    "items" : [ 
	        {
	            "quantity" : 1,
	            "product_id" : "03",
	            "product_name" : "Camaron",
	            "price" : new Big("1.30"),
	            "amount" : new Big("1.30")
	        }, 
	        {
	            "quantity" : 3,
	            "product_id" : "04",
	            "product_name" : "Hamburguesa",
	            "price" : new Big("0.80"),
	            "amount" : new Big("2.40")
	        }
	    ],
	    "subtotal" : new Big("3.70"),
	    "tax" : new Big("0.444"),
	    "total" : new Big("4.114")
	}
	date : string = moment(this.sale.date).format("DD/MM/YYYY")


  constructor(private ventaService: VentaService) { }

	add_row = function ()
	{
		if (this.sale.items[this.sale.items.length -1 ].quantity > 0)
		{
			this.sale.items.push(new Item());	
		}

		
	}

	save(): void {
	   this.ventaService.createSale(this.sale)
	     .subscribe(() => {});
	 }



  ngOnInit() {
  	 
	        
  }

}
