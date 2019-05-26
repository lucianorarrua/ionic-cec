import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ModalListPage } from './modal-list.page';
import { CircularItemComponent } from './circular-item/circular-item.component';

const routes: Routes = [
  {
    path: '',
    component: ModalListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalListPage, CircularItemComponent]
})
export class ModalListPageModule { }
