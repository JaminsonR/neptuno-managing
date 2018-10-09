import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent }      from '../registro/registro.component';
import { LoginComponent } from '../login/login.component';
import { VentaComponent }      from '../venta/venta.component';
import { ResumenVentasComponent }      from '../resumen-ventas/resumen-ventas.component';
import { DetalleVentaComponent }      from '../detalle-venta/detalle-venta.component';


const routes: Routes = [
  { path: 'registro', component: RegistroComponent } ,
  { path: '', component: LoginComponent } ,
  { path: 'venta', component: VentaComponent },
  { path: 'resumen_ventas', component: ResumenVentasComponent },
  { path: 'venta/:id', component: DetalleVentaComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule {}

