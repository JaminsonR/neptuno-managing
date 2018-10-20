import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent }      from '../registro/registro.component';
import { LoginComponent } from '../login/login.component';
import { VentaComponent }      from '../venta/venta.component';
import { ResumenVentasComponent }      from '../resumen-ventas/resumen-ventas.component';
import { DetalleVentaComponent }      from '../detalle-venta/detalle-venta.component';
import { AuthGuard } from '../_guads/auth-guard';
import { DashboardComponent } from '..//dashboard/dashboard.component';


const routes: Routes = [
  { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard] } ,
  { path: '', component: LoginComponent } ,
  { path: 'venta', component: VentaComponent, canActivate: [AuthGuard] },
  { path: 'resumen_ventas', component: ResumenVentasComponent, canActivate: [AuthGuard] },
  { path: 'venta/:id', component: DetalleVentaComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule {}

