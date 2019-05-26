import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.page.html',
  styleUrls: ['./modal-list.page.scss'],
})
export class ModalListPage implements OnInit {

  @Input() listItems: { imgItem: string, textItem: string };



  constructor(private modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
  }
  ngOnInit() {
  }

  returnItem(index: number, item: { imgItem: string, textItem: string }) {
    this.modalController.dismiss({
      'index': index,
      'result': item
    })
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
