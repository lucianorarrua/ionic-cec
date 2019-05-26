import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      {
        path: 'addresses/',
        loadChildren:
          '../addresses/addresses.module#AddressesPageModule'
      },
      {
        path: 'orders',
        loadChildren:
          '../orders/orders.module#OrdersPageModule'
      },
      {
        path: 'favorites',
        loadChildren:
          '../favorites/favorites.module#FavoritesPageModule'
      },
      {
        path: 'account',
        loadChildren:
          '../account/account.module#AccountPageModule'
      },
      {
        path: 'help',
        loadChildren:
          '../help/help.module#HelpPageModule'
      },
      {
        path: 'create-virtual-table/:uid',
        loadChildren:
          '../create-virtual-table/create-virtual-table.module#CreateVirtualTablePageModule'
      },
      {
        path: 'edit-virtual-table/',
        loadChildren:
          '../edit-virtual-table/edit-virtual-table.module#EditVirtualTablePageModule'
      },
      {
        path: 'my-virtual-tables',
        loadChildren:
          '../my-virtual-tables/my-virtual-tables.module#MyVirtualTablesPageModule'
      },
      {
        path: 'about',
        loadChildren:
          '../about/about.module#AboutPageModule'
      }
    ]
  },
  {
    path: '*',
    redirectTo: '/menu/home'
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
