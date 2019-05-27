import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { PayMethod } from 'src/app/shared/models/pay-method.model';
import {
  AngularFirestore
} from 'angularfire2/firestore';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { Image } from 'src/app/shared/models/image.model';
import { VirtualTable } from 'src/app/shared/models/virtual-table.model';
import { ToastController, LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Color } from '@ionic/core';

@Component({
  selector: 'app-create-virtual-table',
  templateUrl: './create-virtual-table.page.html',
  styleUrls: ['./create-virtual-table.page.scss']
})
export class CreateVirtualTablePage implements OnInit {
  formGroup: FormGroup;
  validationMessages: any;
  payMethods: PayMethod[];
  selectedPayMethods: PayMethod[];
  virtualTablePhotoSrc: any;
  thereIsPhoto: boolean;
  errorToast = new BehaviorSubject('');
  successToast = new BehaviorSubject('');
  isLoading = new BehaviorSubject(false);
  @ViewChild('virtualTablePhoto') virtualTablePhoto: ElementRef;
  // Variables de traducción
  minuteValues: number[];
  esMonthNames: string[];
  esMonthShortNames: string[];
  esDayNames: string[];
  esDayShortNames: string[];

  constructor(
    private cameraService: CameraService,
    private router: Router,
    private readonly afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private storage: FirebaseStorageService,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
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
        this.presentToast(nuevoMensaje, 4000, 'success');
      }
    });
    this.thereIsPhoto = false;
    this.afs
      .collection<PayMethod>('payment-methods')
      .valueChanges()
      .subscribe(paymentMethods => {
        this.payMethods = paymentMethods;
      });

    this.virtualTablePhotoSrc = '../../../../assets/pizza.svg';
    this.minuteValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    this.esMonthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];
    this.esMonthShortNames = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ];
    this.esDayNames = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sabado'
    ];
    this.esDayShortNames = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

    this.formGroup = this.formBuilder.group({
      title: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      extraInformation: new FormControl(),
      price: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.min(1)])
      ),
      maxEating: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.min(1)])
      ),
      payMethods: new FormControl('', Validators.required),
      deadlineForEntering: new FormControl('', Validators.required),
      deliveryTime: new FormControl('', Validators.required),
      acceptAutomatically: new FormControl()
    });

    this.validationMessages = {
      title: [
        { type: 'required', message: 'Debe ingresar un título al plato.' },
        {
          type: 'minlength',
          message: 'El título debe tener al menos 2 caracteres.'
        }
      ],
      extraInformation: [],
      price: [
        { type: 'required', message: 'Ingrese un precio al plato.' },
        { type: 'min', message: 'El precio no puede ser cero.' }
      ],
      maxEating: [
        {
          type: 'required',
          message:
            'Ingrese la cantidad de comensales que se podrán anotar a la mesa.'
        },
        { type: 'min', message: 'La cantidad no puede ser cero.' }
      ],
      payMethods: [
        {
          type: 'required',
          message: 'Debe seleccionar al menos un método de pago'
        }
      ],
      deadlineForEntering: [
        {
          type: 'required',
          message: 'Ingrese fecha y hora máxima hasta la cual acepta pedidos.'
        }
      ],
      deliveryTime: [
        {
          type: 'required',
          message: 'Ingrese fecha y hora para comenzar a entregar pedidos'
        }
      ]
    };
  }

  takePhoto() {
    this.cameraService
      .takePicture()
      .then(res => {
        this.virtualTablePhotoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          res && res.dataUrl
        );
        this.thereIsPhoto = true;
      })
      .catch(() => {
        console.log('No se recibió ninguna imagen');
      });
  }

  selectPhoto() {
    this.errorToast.next('La funcionalidad de seleccionar una foto desde la galería no se encuentra disponible aún');
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
      message: 'Estamos creando su mesa virtual.',
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

  goToHome() {
    this.router.navigate(['/menu', 'home']);
  }

  tryCreateVirtualTable(value: {
    acceptAutomatically: boolean;
    deadlineForEntering: Date;
    deliveryTime: Date;
    extraInformation: string;
    maxEating: number;
    payMethods: PayMethod[];
    price: number;
    title: string;
  }) {
    if (!value.acceptAutomatically) {
      value.acceptAutomatically = false;
    }
    this.isLoading.next(true);
    this.presentLoading();
    let base64ProfileImage: any;
    if (this.thereIsPhoto) {
      base64ProfileImage = this.virtualTablePhotoSrc
        .changingThisBreaksApplicationSecurity;
    } else {
      this.errorToast.next('Por favor, ingrese una imagen o foto de su plato.');
      this.isLoading.next(false);
      return false;
    }
    // Sube la imagen al Storage
    this.storage
      .uploadToStorage(base64ProfileImage, 'virtual-table-photos')
      .then(uploadTask => {
        //Consulta al Storage la URL de la imagen que se acaba de subir.
        this.storage.getDownloadURL(uploadTask.metadata.fullPath).subscribe(
          urlImage => {
            // Cuando recibe la URL crea un objeto de tipo Image y lo completa con los datos correspondientes.
            let imageForVirtualTable: Image;
            imageForVirtualTable = {
              contentType: uploadTask.metadata.contentType,
              created: uploadTask.metadata.updated,
              fullPath: uploadTask.metadata.fullPath,
              url: urlImage
            };

            // Traigo el uid que lo tengo como parametro de la url y con eso ya tengo todos los datos apra armar la virtual Table
            this.activatedRoute.params.subscribe(
              params => {
                let newVirtualTable: VirtualTable;
                newVirtualTable = {
                  id: '',
                  title: value.title,
                  extraInformation: value.extraInformation,
                  imageFood: imageForVirtualTable,
                  price: value.price,
                  dinersId: [],
                  maxEating: value.maxEating,
                  paymentMethods: value.payMethods,
                  acceptAutomatically: value.acceptAutomatically,
                  deadlineForEntering: value.deadlineForEntering,
                  deliveryTime: value.deliveryTime,
                  tags: [],
                  latitude: 0,
                  longitude: 0,
                  chefUid: params.uid
                };

                this.afs
                  .collection<VirtualTable>('virtual-tables')
                  .add(newVirtualTable)
                  .then(res => {
                    this.afs.doc(`virtual-tables/${res.id}`).update({ id: res.id })
                      .then(update => {
                        this.isLoading.next(false);
                        this.successToast.next(`Felicidades! Su mesa ${value.title} ya se encuentra abierta a los comensales`);
                        this.formGroup.reset();
                        this.virtualTablePhotoSrc = '../../../../assets/pizza.svg';
                      })
                      .catch(errUpdate => {
                        this.isLoading.next(false);
                        this.errorToast.next('Ha ocurrido un error al crear la mesa: ' + errUpdate);
                        this.storage.deleteFromStorage(uploadTask.metadata.fullPath).subscribe(data => console.log(data));
                        this.afs.doc(`virtual-tables/${res.id}`).delete();
                      });
                  })
                  .catch(err => {
                    this.isLoading.next(false);
                    this.storage.deleteFromStorage(uploadTask.metadata.fullPath).subscribe(data => console.log(data));
                    this.errorToast.next('Ha ocurrido un error al crear la mesa: ' + err);
                  });
              },
              errorParams => {
                this.isLoading.next(false);
                this.storage.deleteFromStorage(uploadTask.metadata.fullPath).subscribe(data => console.log(data));
                this.errorToast.next('Ha ocurrido un error al obtener su usuario: ' + errorParams);
              }
            );
          },
          errorUrlImage => {
            this.isLoading.next(false);
            this.storage.deleteFromStorage(uploadTask.metadata.fullPath).subscribe(data => console.log(data));
            this.errorToast.next('Ha ocurrido un error al recuperar la imagen de la mesa: ' +
              errorUrlImage);
          }
        );
      })
      .catch(errorUploadTask => {
        this.isLoading.next(false);
        this.errorToast.next('Ha ocurrido un error al cargar la imagen de la mesa: ' +
          errorUploadTask);
      });
  }
}
