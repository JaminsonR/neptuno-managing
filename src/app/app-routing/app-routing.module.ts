import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent } from '../registro/registro.component';
import { LoginComponent } from '../login/login.component';
import { VentaComponent } from '../venta/venta.component';
import { ResumenVentasComponent } from '../resumen-ventas/resumen-ventas.component';
import { DetalleVentaComponent } from '../detalle-venta/detalle-venta.component';
import { InventarioComponent } from '../inventario/inventario.component';
import { AuthGuard } from '../_guads/auth-guard';


const routes: Routes = [
  { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard] } ,
  { path: '', component: LoginComponent } ,
  { path: 'venta', component: VentaComponent, canActivate: [AuthGuard] },
  { path: 'resumen_ventas', component: ResumenVentasComponent, canActivate: [AuthGuard] },
  { path: 'venta/:id', component: DetalleVentaComponent, canActivate: [AuthGuard] },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule {}

