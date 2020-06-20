import {
  Component,
  OnInit,
  Renderer2,
  Inject,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import * as moment from "moment";
import { Sale } from "../models/Sale";
import { Item } from "../models/Item";
import { VentaService } from "../services/ventasService/venta.service";
import { ClientesService } from "../services/clientesService/clientes.service";
import { ProductosService } from "../services/productosService/producto.service";
import { Client } from "../models/Client";
import { Product } from "../models/Product";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-venta",
  templateUrl: "./venta.component.html",
  styleUrls: ["./venta.component.css"],
})
export class VentaComponent implements OnInit {
  @ViewChild("successDialog") successDialog: TemplateRef<any>;
  @ViewChild("failureDialog") failureDialog: TemplateRef<any>;
  @ViewChild("incompleteDialog") incompleteDialog: TemplateRef<any>;

  // user input values
  perItemDiscount: string[] = ["0.00"];
  itemQuantities: string[] = ["0"];
  discount: string = "0";

  calculatedDiscount: number = 0;
  TAX = 0.12;

  // model bound values
  sale: Sale = {
    _id: undefined,
    client_id: " ",
    date: new Date().toDateString(),
    client_name: " ",
    client_phone: " ",
    client_address: " ",
    items: [
      {
        quantity: 0,
        product_id: " ",
        product_name: " ",
        price: 0,
        itemDiscount: 0,
        itemSubtotal: 0,
        amount: 0,
        isBulk: false,
      },
    ],
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    status: "",
    due_date: "",
  };
  date: string = moment(new Date(this.sale.date)).format("DD/MM/YYYY");

  clients: Client[];
  products: Product[];
  modalText = "";
  statuses: String[] = ["Por cobrar", "Cobrada", "Vencida"];
  constructor(
    private ventaService: VentaService,
    private clienteService: ClientesService,
    private productosService: ProductosService,
    private dialog: MatDialog
  ) {}

  add_row = function () {
    if (this.sale.items[this.sale.items.length - 1].quantity > 0) {
      let item = new Item();
      item.quantity = 0;
      item.amount = 0;
      this.sale.items.push(item);
      this.perItemDiscount.push("0.00");
    }
  };
  openDialog(dialog: TemplateRef<any>) {
    //const dialogConfig = new MatDialogConfig();
    return this.dialog.open(dialog);
  }

  getClients(): void {
    this.clienteService.getClients().subscribe((response) => {
      this.clients = response.data as Client[];
    });
  }

  getProducts(): void {
    this.productosService.getProducts().subscribe((response) => {
      this.products = response.data as Product[];
    });
  }

  backToParent(): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    window.location.replace("../resumen_ventas");
  }

  save(): void {
    if (
      this.sale.client_name != " " &&
      this.sale.items.length > 0 &&
      this.sale.subtotal > 0 &&
      this.sale.status != "" &&
      this.sale.due_date != "" &&
      new Date(this.sale.date).getTime() <=
        new Date(this.sale.due_date).getTime()
    ) {
      this.sale.items = this.cleanItems(this.sale.items);
      this.sale.client_id = this.sale.client_id.replace(/\s/g, "");
      this.ventaService.createSale(this.sale).subscribe(
        (response) => {
          if (response.state === true) {
            this.openDialog(this.successDialog);
          } else {
            this.openDialog(this.failureDialog);
            console.log(response);
          }
        },
        (error) => {
          this.openDialog(this.failureDialog);
          console.log(error);
        }
      );
      return;
    }
    this.openDialog(this.incompleteDialog);
  }

  cleanItems(items: Item[]): Item[] {
    let clenseItems: Item[] = [];
    for (let item of items) {
      if (item.amount > 0) {
        clenseItems.push(item);
      }
    }
    return clenseItems;
  }

  clientLookUp(event: any): void {
    let id = event.target.value.replace(/\s/g, "");
    for (var client of this.clients) {
      if (client.client_id === id) {
        this.sale.client_name = client.client_name;
        this.sale.client_address = client.client_address;
        this.sale.client_phone = client.client_phone;
        return;
      }
    }
    this.sale.client_name = " ";
    this.sale.client_address = " ";
    this.sale.client_phone = " ";
  }

  productLookUp(event: any, i: number): void {
    // force upper case
    this.sale.items[i].product_id = this.sale.items[i].product_id
      .toUpperCase()
      .replace(/\s/g, "");

    let id = this.sale.items[i].product_id;
    console.log(this.sale.items[i].product_id);
    for (var product of this.products) {
      console.log(product.id);
      console.log(id);
      console.log("-----");
      if (product.id === id) {
        if (!this.sale.items[i].quantity) {
          this.sale.items[i].quantity = 0.0;
        }
        this.sale.items[i].product_name = product.name;
        this.sale.items[i].price = this.sale.items[i].isBulk
          ? product.bulkPrice
          : product.price;
        this.sale.items[i].amount = Number(
          this.sale.items[i].quantity * this.sale.items[i].price
        );
        this.updateAmount(event, i);
        this.updateTotals();

        return;
      }
    }
    this.sale.items[i].product_name = " ";
    this.sale.items[i].price = 0.0;
  }
  perItemDiscountInit(event: any, i: number) {
    // if field is empty we initialize with 0.00
    if (this.perItemDiscount[i].replace(/\s/g, "") == "") {
      this.perItemDiscount[i] = "0.00";
    }
    this.updateAmount(event, i);
    this.updateTotals();
  }
  clearItemDiscount(event: any, i: number) {
    // clear field if user focus it
    this.perItemDiscount[i] = "";
    this.sale.items[i].itemDiscount = 0;
    this.updateAmount(event, i);
    this.updateTotals();
  }
  discountInit() {
    // if field is empty we initialize with 0.00
    if (this.discount.replace(/\s/g, "") == "") {
      this.discount = "0";
    }
    this.updateTotals();
  }
  clearDiscount() {
    // clear field if user focus it
    this.discount = "";
    this.sale.discount = 0;
    this.updateTotals();
  }
  clearQuantity(event: any, i: number) {
    // clear field if user focus it
    this.itemQuantities[i] = "";
    this.updateAmount(event, i);
    this.updateTotals();
  }
  quantityInit(event: any, i: number) {
    // if field is empty we initialize with 0
    if (this.itemQuantities[i] == "") {
      this.itemQuantities[i] = "0";
    }
    this.updateAmount(event, i);
    this.updateTotals();
  }
  updateAmount(event: any, i: number): void {
    // updates the itemSubtotal, itemDiscount and itemAmount values
    let quantity = Number(this.itemQuantities[i]);

    if (!this.sale.items[i].price) {
      this.sale.items[i].price = 0;
      this.sale.items[i].itemDiscount = 0;
    }
    // copy user input discount to model discount
    this.sale.items[i].itemDiscount = Math.round(
      parseFloat(String(Number(this.perItemDiscount[i]))) * 100
    );

    this.sale.items[i].quantity = quantity;

    this.sale.items[i].itemSubtotal = quantity * this.sale.items[i].price;

    this.sale.items[i].amount =
      quantity * (this.sale.items[i].price - this.sale.items[i].itemDiscount);
    this.updateTotals();
  }
  updateTotals(): void {
    let subtotal: number = 0;
    let tax_subtotal: number = 0;
    let tax: number = 0;
    let total: number = 0;

    // updating discount
    this.sale.discount = Math.round(parseFloat(String(Number(this.discount))));

    for (let item of this.sale.items) {
      subtotal = item.amount + subtotal;
      let prod = this.products.find(function (product) {
        return product.id === item.product_id;
      });
      if (prod && prod.isTaxable) {
        tax_subtotal = item.amount + tax_subtotal;
      }
    }
    //tax_subtotal = the sum of taxable item values
    tax = tax_subtotal * this.TAX;
    console.log(this.sale.discount); //String(Number(
    this.calculatedDiscount = subtotal * (this.sale.discount / 100);
    total = subtotal + tax - this.calculatedDiscount;

    this.sale.subtotal = subtotal;
    this.sale.tax = tax;
    this.sale.total = total;
  }

  ngOnInit() {
    this.getClients();
    this.getProducts();
  }
}
