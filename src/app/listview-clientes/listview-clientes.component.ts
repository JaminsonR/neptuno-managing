import { Component, OnInit, ViewChild } from "@angular/core";
import { RegistroClienteComponent } from "../registro-cliente/registro-cliente.component";
import { Router } from "@angular/router";
import { Client } from "../models/Client";
import { ClientesService } from "../services/clientesService/clientes.service";
import { MatDialog, MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: "applist-view-clientes",
  templateUrl: "./listview-clientes.component.html",
  styleUrls: ["./listview-clientes.component.css"],
})

// tabla example
// https://stackblitz.com/edit/angular-axjzov-xc4kbp?file=app%2Ftable-filtering-example.ts
export class ListviewClientesComponent implements OnInit {
  clients: Client[];
  displayedColumns: string[] = ["id", "name", "email", "phone"];
  dataSource = new MatTableDataSource();
  selectedClient: Client;
  showResumen: boolean = true;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private ClientesService: ClientesService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  getClients(): void {
    this.ClientesService.getClients().subscribe(
      (response) => {
        this.clients = response.data;
        this.dataSource = new MatTableDataSource(this.clients);
      },
      (error) => {}
    );
  }

  ngOnInit() {
    this.getClients();
  }

  select(item: number): void {
    this.selectedClient = this.clients[item];
    this.showResumen = false;
  }

  addClient(): void {
    this.router.navigate([`../clientes/registro`]);
  }
}
