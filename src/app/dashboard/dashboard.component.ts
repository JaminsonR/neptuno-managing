import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { Sale } from '../models/Sale';
import { VentaService } from '../services/ventasService/venta.service';
import { Big } from 'big.js';
import * as moment from 'moment';



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

  chart:any

  dataPoints: any[] = [];
  constructor(private ventaService: VentaService) { }

  formatSales(sales : any[]) : void {
    let month
		for (let sale of sales){
      sale.total = Number(Big(sale.total).toFixed(2))
      month = moment().locale('es')      
      month.month(sale.date - 1)
      this.dataPoints.push({ y: sale.total, label: month.format('MMMM')})
    }		
    this.chart.render();
    
	}
  getSales() : void {
    this.ventaService.getSalesPerMonth()
     .subscribe((response) => {

       this.sales = response.data
       this.formatSales(this.sales)
       
        
     },
     (error) => {});
  }

  ngOnInit() {
    this.getSales()
    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2",
      title: {
        text: "Ventas mensuales"
      },
      data: [{
        type: "column",
        dataPoints: this.dataPoints
      }]
    });
      
    
      
    
      
  }

}
