import { MaterializeModule } from 'angular2-materialize';
import { Moment } from 'moment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { VentaComponent } from './venta/venta.component';
import { ResumenVentasComponent } from './resumen-ventas/resumen-ventas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatInputModule,MatFormFieldModule,MatCheckboxModule,MatButtonModule,MatToolbarModule,MatIconModule,MatMenuModule,MatProgressSpinnerModule,MatCardModule, } from '@angular/material';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    VentaComponent,
    ResumenVentasComponent,
    DetalleVentaComponent
  ],
  imports: [
  MaterializeModule,
    BrowserModule,
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
    MatDialogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
