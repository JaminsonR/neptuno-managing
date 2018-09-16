import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent }      from '../registro/registro.component';
import { LoginComponent } from '../login/login.component';
import { VentaComponent }      from '../venta/venta.component';


const routes: Routes = [
  { path: 'registro', component: RegistroComponent } ,
  { path: '', component: LoginComponent } ,
  { path: 'venta', component: VentaComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule {}

