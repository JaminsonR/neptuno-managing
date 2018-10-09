import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import { Sale } from '../models/Sale';
import { VentaService } from '../services/ventasService/venta.service';
import { Big } from 'big.js';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-resumen-ventas',
  templateUrl: './resumen-ventas.component.html',
  styleUrls: ['./resumen-ventas.component.css']
})
export class ResumenVentasComponent implements OnInit {
	sales: Sale[];
	ELEMENT_DATA: any[] = [];
	displayedColumns: string[] = ['Ruc.', 'Nombre', 'Total','Fecha'];
	search: "";
	initialSelection = [];
	allowMultiSelect = false;
	selectedSale: Sale;
	showResumen: boolean = true;

  	
  	constructor(private ventaService: VentaService, private route: ActivatedRoute,
					  private location: Location,
					  private router: Router) { }
	
	getSales() : void {
  		this.ventaService.getSales()
	     .subscribe((response) => {
	     	console.log(response.data)
	     	this.sales = response.data
	     	this.formatSales(this.sales)
	     	this.ELEMENT_DATA = JSON.parse(JSON.stringify(this.sales))  	
	     },
	     (error) => {});
  	}
	formatSales(sales : Sale[]) : void {
		for (let sale of sales){
			sale.date = moment(sale.date).format("DD/MM/YYYY")
			sale.total = Number(Big(sale.total).toFixed(2))
		}		
		
	}

	clientLookUp(event: any): void {
	 	let id = event.target.value.replace(/^\s+|\s+$/g, '').toLowerCase();
	 	if (id != ''){
	 		this.ELEMENT_DATA.splice(0,this.ELEMENT_DATA.length) //emptying array

		 	for (var sale of this.sales) {
		 		
		 		if (sale.client_id.toLowerCase().includes(id)) {
		 			this.ELEMENT_DATA.push(sale)
		 		}
		 		if (sale.client_name.toLowerCase().includes(id)) {
		 			this.ELEMENT_DATA.push(sale)
		 		}
		 	}
		} else{
			this.ELEMENT_DATA = JSON.parse(JSON.stringify(this.sales))
		}
	 	
	}
	newSale(): void {
		this.router.navigate([`../venta/`]);
	}

	select( item: number) : void {
		console.log(this.ELEMENT_DATA[item])
		this.selectedSale = this.ELEMENT_DATA[item]
		this.showResumen = false;
		//this.router.navigate([`../venta/${this.selectedSale._id}`]);
	}
	
  	ngOnInit() {
  		this.getSales()
  		

  		
  	}

}
