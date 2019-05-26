import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/shared/models/user.model';
import { Image } from 'src/app/shared/models/image.model';
import { VirtualTable } from 'src/app/shared/models/virtual-table.model';
import { PayMethod } from 'src/app/shared/models/pay-method.model';
import { ToastController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { Color } from '@ionic/core';




@Component({
  selector: 'app-my-virtual-tables',
  templateUrl: './my-virtual-tables.page.html',
  styleUrls: ['./my-virtual-tables.page.scss']
})
export class MyVirtualTablesPage implements OnInit {
  openVirtualTables: VirtualTable[];
  closedVirtualTables: VirtualTable[];
  authUser: any;
  userData: User;
  successToast = new BehaviorSubject('');


  constructor(
    private readonly afs: AngularFirestore,
    private authService: AuthenticationService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.userData = new User('', '', '', 5.0, null);
    this.authUser = { uid: ' ' };
    this.successToast.subscribe(nuevoMensaje => {
      if (nuevoMensaje !== '') {
        this.presentToast(nuevoMensaje, 4000, 'success');
      }
    });
    this.openVirtualTables = [
      new VirtualTable(
        '',
        '',
        '',
        new Image('', '', '', ''),
        0,
        [],
        0,
        [new PayMethod('', true)],
        new Date(),
        new Date(),
        [],
        0,
        0,
        ''
      )
    ];
    this.closedVirtualTables = [
      new VirtualTable(
        '',
        '',
        '',
        new Image('', '', '', ''),
        0,
        [],
        0,
        [new PayMethod('', true)],
        new Date(),
        new Date(),
        [],
        0,
        0,
        ''
      )
    ];

    this.authService.currentUser().then(stringAuthUser => {
      this.authUser = JSON.parse(stringAuthUser);
      this.afs
        .collection<VirtualTable>('virtual-tables')
        .valueChanges()
        .subscribe(virtualTables => {
          const today = new Date();
          this.openVirtualTables = virtualTables.filter(virtualTable => {
            return (
              new Date(virtualTable.deadlineForEntering) > today &&
              (virtualTable.chefUid == this.authUser.uid)
            );
          });
          this.closedVirtualTables = virtualTables.filter(virtualTable => {
            return (
              new Date(virtualTable.deadlineForEntering) < today &&
              (virtualTable.chefUid == this.authUser.uid)
            );
          });
        });
    });
    this.presentToast('Deslice hacia la izquierda una mesa virtual para más opciones.', 4000, '')
  }

  async presentDeleteVirtualTableToast(virtualTable: VirtualTable) {
    const toast = await this.toastController.create({
      header: `Eliminar mesa ${virtualTable.title}`,
      message: '¿Está seguro que desea eliminar esta mesa?',
      duration: 5000,
      position: 'bottom',
      buttons: [
        {
          icon: 'trash',
          text: 'Eliminar',
          handler: () => {
            this.deleteVirtualTable(virtualTable);
          }
        },
        {
          icon: 'close',
          role: 'cancel',
          handler: () => {
            toast.dismiss();
          }
        }
      ]
    });
    toast.present();
  }

  async presentToast(message: string, duration: number, color: Color) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color
    });
    toast.present();
  }

  deleteVirtualTable(virtualTable: VirtualTable) {
    this.afs
      .collection('virtual-tables')
      .doc(virtualTable.id).delete().then((res) => {
        this.successToast.next(`La mesa ${virtualTable.title} fué eliminada satisfactoriamente.`);
      });
  }
}
