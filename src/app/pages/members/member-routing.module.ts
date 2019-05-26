import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'menu',
    loadChildren: './menu/menu.module#MenuPageModule'
  },];

/* El .forChild(routes) es debido a que este es un módulo de entutamiendo SECUNDARIO. El principal es el AppRoutingModule
el cual si utiliza .forRoot(routes)
*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
