import { Component, OnInit } from "@angular/core";
import { Client } from "../models/Client";
import { ClientesService } from "../services/clientesService/clientes.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-registro-cliente",
  templateUrl: "./registro-cliente.component.html",
  styleUrls: ["./registro-cliente.component.css"],
})
export class RegistroClienteComponent implements OnInit {
  constructor(
    private clientesService: ClientesService,
    private location: Location
  ) {}

  client: Client = {
    client_id: "",
    client_email: "",
    client_name: "",
    client_phone: "",
    client_address: "",
  };

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.clientesService
      .createClient(this.client)
      .subscribe(() => this.goBack());
  }

  ngOnInit() {}
}
