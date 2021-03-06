import { MaterializeModule } from "angular2-materialize";
import { Moment } from "moment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms"; // <-- NgModel lives here
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpModule, RequestOptions } from "@angular/http";
import { AuthGuard } from "./_guads/auth-guard";
import { AppComponent } from "./app.component";
import { RegistroComponent } from "./registro/registro.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { LoginComponent } from "./login/login.component";
import { VentaComponent } from "./venta/venta.component";
import { ResumenVentasComponent } from "./resumen-ventas/resumen-ventas.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatNativeDateModule,
  MatTableModule,
  MatSnackBarModule,
} from "@angular/material";
import { DetalleVentaComponent } from "./detalle-venta/detalle-venta.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NavbarComponent } from "./navbar/navbar.component";
import { MatListModule } from "@angular/material/list";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthenticationService } from "./services/authenticationService/authentication.service";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { LOCALE_ID } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InventarioComponent } from "./inventario/inventario.component";
import { InventarioCrearComponent } from "./inventario/inventario-crear/inventario-crear.component";
import { RegistroClienteComponent } from "./registro-cliente/registro-cliente.component";
import { ListviewClientesComponent } from "./listview-clientes/listview-clientes.component";

export function getToken() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    VentaComponent,
    ResumenVentasComponent,
    DetalleVentaComponent,
    NavbarComponent,
    DashboardComponent,
    InventarioComponent,
    InventarioCrearComponent,
    RegistroClienteComponent,
    ListviewClientesComponent,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
      },
    }),
    MatSnackBarModule,
    MatTableModule,
    MaterializeModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationService,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: "en-GB" },
  ],
  entryComponents: [InventarioCrearComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
