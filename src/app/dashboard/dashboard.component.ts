import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { Sale } from '../models/Sale';
import { VentaService } from '../services/ventasService/venta.service';
import { Big } from 'big.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  
  user: any = {
    id: "string",
    middle_name: "string",
    family_name: "string",
    last_name: "string",
    email: "string",
    first_name : "Felix Rodriguez"
  };
  sales: Sale[];

  dataPoints: any[];
  constructor(private ventaService: VentaService) { }

  formatSales(sales : Sale[]) : void {
		for (let sale of sales){
			//sale.date = moment(sale.date).format("DD/MM/YYYY")
			sale.total = Number(Big(sale.total).toFixed(2))
			//sale.due_date = moment(sale.due_date).format("DD/MM/YYYY")
		}		
		
	}
  getSales() : void {
    this.ventaService.getSales()
     .subscribe((response) => {
       console.log(response.data)
       this.sales = response.data
       this.formatSales(this.sales)
       this.dataPoints = JSON.parse(JSON.stringify(this.sales))  	
     },
     (error) => {});
  }

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2",
      title: {
        text: "Ventas mensuales"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Enero" },
          { y: 55, label: "Febrero" },
          { y: 50, label: "Marzo" },
          { y: 65, label: "Abril" },
          { y: 95, label: "Mayo" },
          { y: 68, label: "Junio" },
          { y: 28, label: "Julio" },
          { y: 34, label: "Agosto" },
          { y: 14, label: "Septiembre" }
        ]
      }]
    });
      
    chart.render();
      
  }

}
