import { Component, OnInit, Input } from '@angular/core';
import { VirtualTable } from 'src/app/shared/models/virtual-table.model';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Color } from '@ionic/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enter-virtual-table-modal',
  templateUrl: './enter-virtual-table-modal.page.html',
  styleUrls: ['./enter-virtual-table-modal.page.scss']
})
export class EnterVirtualTableModalPage implements OnInit {
  @Input() virtualTableSelected: VirtualTable;
  @Input() conmensal: User;
  public chefData: User;
  errorToast = new BehaviorSubject('');
  successToast = new BehaviorSubject('');
  isLoading = new BehaviorSubject(false);

  constructor(
    private modalController: ModalController,
    private authService: AuthenticationService,
    private readonly afs: AngularFirestore,
    public toastController: ToastController,
    private datePipe: DatePipe,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.errorToast.subscribe(nuevoMensaje => {
      if (nuevoMensaje !== '') {
        this.presentToast(nuevoMensaje, 4000, 'danger');
      }
    });
    this.successToast.subscribe(nuevoMensaje => {
      if (nuevoMensaje !== '') {
        this.presentToast(nuevoMensaje, 6000, 'success');
      }
    });
    this.chefData = new User('', '', '', 5.0, null);
    this.initPropertyData();
  }

  returnItem() {
    this.isLoading.next(true);
    this.presentLoading();
    this.virtualTableSelected.dinersId.push(this.conmensal.uid);
    this.afs
      .collection('virtual-tables')
      .doc(this.virtualTableSelected.id)
      .update({ dinersId: this.virtualTableSelected.dinersId })
      .then(res => {
        this.isLoading.next(false);
        this.successToast.next(`Ha solicitado un plato de la mesa ${this.virtualTableSelected.title} por ${'$' + this.virtualTableSelected.price}. \n Podrá recoger su plato a partir de ${this.datePipe.transform(this.virtualTableSelected.deliveryTime)} a las ${this.datePipe.transform(
          this.virtualTableSelected.deliveryTime,
          'shortTime'
        )}`);
        this.modalController.dismiss();
      }).catch(() => {
        this.isLoading.next(false);
      })
      ;
  }

  closeModal() {
    this.modalController.dismiss();
  }

  private initPropertyData() {
    let users: Observable<User[]>;
    users = this.afs.collection<User>('users').valueChanges();
    this.chefData = new User('', '', '', 5.0, null);
    this.authService.currentUser().then(stringAuthUser => {
      users.subscribe(users => {
        this.chefData = users.find(
          user => user.uid === this.virtualTableSelected.chefUid
        );
      });
    });
  }

  async presentToast(message: string, duration: number, color: Color) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color
    });
    toast.present();
  }

  async presentLoading() {
    const loadingModal = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Estamos procesando su pedido.',
      translucent: true
    });
    await loadingModal.present().then(res => {
      this.isLoading.subscribe(loading => {
        if (!loading) {
          loadingModal.dismiss();
        }
      });
    });
  }
}
