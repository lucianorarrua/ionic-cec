import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChefPromotionCardComponent } from './components/chef-promotion-card/chef-promotion-card.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { VirtualTableCardComponent } from './components/virtual-table-card/virtual-table-card.component';


@NgModule({
  declarations: [ChefPromotionCardComponent, ValidationMessageComponent, VirtualTableCardComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [ChefPromotionCardComponent, ValidationMessageComponent, VirtualTableCardComponent]
})
export class SharedModule { }
