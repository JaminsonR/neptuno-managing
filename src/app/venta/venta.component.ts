import { Component, OnInit, Renderer2 } from '@angular/core';
import { Big } from 'big.js';
import * as moment from 'moment';
import { Sale } from '../models/Sale';
import { Item } from '../models/Item';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

sale : Sale = 
{
    "client_id" : "0912345685001",
    "date" : moment("2018-04-18T16:31:10.000Z"),
    "client_name" : "Cliente A",
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

add_row = function ()
{
	if (this.sale.items[this.sale.items.length -1 ].quantity > 0)
	{
		this.sale.items.push(new Item());	
	}

	
}
  constructor() { }

  ngOnInit() {
  }

}
