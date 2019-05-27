import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CameraService } from 'src/app/services/camera.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { ModalListPage } from '../../modals/modal-list/modal-list.page';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { Image } from 'src/app/shared/models/image.model';
import { User } from 'src/app/shared/models/user.model';
import { ToastController } from '@ionic/angular';
import { Color } from '@ionic/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  validationsForm: FormGroup;
  validationMessages: any;
  errorToast = new BehaviorSubject('');
  successToast = new BehaviorSubject('');
  isLoading = new BehaviorSubject(false);
  avatarList: { imgItem: string; textItem: string }[];
  valueForValidateRepassword: string;
  profilePhotoSrc: any;
  isCameraPhoto: boolean;
  @ViewChild('profilePhoto') profilePhoto: ElementRef;

  constructor(
    private cameraService: CameraService,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private readonly afs: AngularFirestore,
    private storage: FirebaseStorageService,
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

    this.isCameraPhoto = false;
    this.profilePhotoSrc = '../../../../assets/avatars/chef-hat.svg';

    this.avatarList = [
      {
        imgItem: '../../../../assets/avatars/avatarH1.svg',
        textItem: 'Avatar 1'
      },
      {
        imgItem: '../../../../assets/avatars/avatarH2.svg',
        textItem: 'Avatar 2'
      },
      {
        imgItem: '../../../../assets/avatars/avatarH3.svg',
        textItem: 'Avatar 3'
      },
      {
        imgItem: '../../../../assets/avatars/avatarM1.svg',
        textItem: 'Avatar 4'
      },
      {
        imgItem: '../../../../assets/avatars/avatarM2.svg',
        textItem: 'Avatar 5'
      },
      {
        imgItem: '../../../../assets/avatars/avatarM3.svg',
        textItem: 'Avatar 6'
      },
      {
        imgItem: '../../../../assets/avatars/chef-hat.svg',
        textItem: 'Avatar 7'
      },
      {
        imgItem: '../../../../assets/avatars/grandmother.svg',
        textItem: 'Avatar 8'
      }
    ];

    this.validationsForm = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.required
        ])
      ),
      surname: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.required
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
      repassword: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern(this.valueForValidateRepassword)
        ])
      )
    });

    this.validationMessages = {
      name: [
        { type: 'required', message: 'Debe ingresar un Nombre.' },
        {
          type: 'minlength',
          message: 'El nombre debe tener al menos 2 caracteres.'
        }
      ],
      surname: [
        { type: 'required', message: 'Debe ingresar un Apellido.' },
        {
          type: 'minlength',
          message: 'El apellido debe tener al menos 2 caracteres.'
        }
      ],
      email: [
        { type: 'required', message: 'Ingrese un Email.' },
        { type: 'pattern', message: 'Por favor, ingrese un Email válido.' }
      ],
      password: [
        { type: 'required', message: 'Ingrese una contraseña.' },
        {
          type: 'minlength',
          message: 'La contraseña debe tener al menos 5 caracteres.'
        }
      ],
      repassword: [
        { type: 'required', message: 'Ingrese una contraseña.' },
        {
          type: 'minlength',
          message: 'La contraseña debe tener al menos 5 caracteres.'
        },
        { type: 'pattern', message: 'Las contraseñas no coinciden.' }
      ]
    };
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalListPage,
      componentProps: { listItems: this.avatarList }
    });
    await modal.present();
    await modal
      .onDidDismiss()
      .then(res => {
        this.profilePhotoSrc = res.data.result.imgItem;
        this.isCameraPhoto = false;
      })
      .catch(res => console.log('No se seleccionó avatar'));
  }

  async presentLoading() {
    const loadingModal = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Estamos registrandolo en nuestra base de datos.',
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

  async presentToast(message: string, duration: number, color?: Color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  tryRegisterUser(value: {
    name: string;
    surname: string;
    email: string;
    password: string;
    repassword: string;
  }) {
    this.isLoading.next(true);
    this.presentLoading();
    // Crea una Imagen base64 con el avatar o foto de perfil seleccionada (Porque a firebase le gusta base64)
    let base64ProfileImage: any;
    if (this.isCameraPhoto) {
      base64ProfileImage = this.profilePhotoSrc
        .changingThisBreaksApplicationSecurity;
    } else {
      base64ProfileImage = this.svgToPng(this.profilePhoto.nativeElement);
    }
    // Sube la imagen al Storage
    this.storage
      .uploadToStorage(base64ProfileImage, 'profile-photos')
      .then(uploadTask => {
        //Consulta al Storage la URL de la imagen que se acaba de subir.
        this.storage
          .getDownloadURL(uploadTask.metadata.fullPath)
          .subscribe(urlImage => {
            // Cuando recibe la URL crea un objeto de tipo Image y lo completa con los datos correspondientes.
            let imageForUser: Image;
            imageForUser = {
              contentType: uploadTask.metadata.contentType,
              created: uploadTask.metadata.updated,
              fullPath: uploadTask.metadata.fullPath,
              url: urlImage
            };
            // Envia los valores del formulario al servicio de Autenticación para crear el User de autenticación de firebase.
            this.firebaseAuthenticationService
              .registerUser(value, base64ProfileImage)
              .then(firebaseUser => {
                /* Si logra crear el usuario creamos un objeto de tipo User y completamos sus datos.
                   Nota: el User que se crea acá es un modelo del proyecto, no es el User de autentiación de firebase. */
                let user: User;
                user = {
                  uid: firebaseUser.user.uid,
                  name: value.name,
                  surname: value.surname,
                  score: 0,
                  profilePhoto: imageForUser,
                  urlBanner: null
                };
                // Agrega un doumento de tipo User a la Database
                this.afs.collection<User>('users').add(user)
                  .then(() => {
                    this.successToast.next(
                      `Felicidades ${
                      user.name
                      }! Su cuenta ha sido crada satisfactoriamente. Por favor, inicie sesión`
                    );
                    this.validationsForm.reset();
                    this.isLoading.next(false);
                    this.profilePhotoSrc =
                      '../../../../assets/avatars/chef-hat.svg';
                  })
                  .catch(err => {
                    this.storage
                      .deleteFromStorage(uploadTask.metadata.fullPath)
                      .subscribe(data => console.log(data));
                    this.errorToast.next(`No se pudo crear el usuario ${err}`);
                    this.isLoading.next(false);
                  });
              })
              .catch(errFirebaseUser => {
                this.storage
                  .deleteFromStorage(uploadTask.metadata.fullPath)
                  .subscribe(data => console.log(data));
                this.errorToast.next(
                  this.firebaseAuthenticationService.getSpanishError(
                    errFirebaseUser
                  )
                );
                this.isLoading.next(false);
              });
          });
      })
      .catch(errUploadTask => {
        this.errorToast.next(
          `Error al cargar la foto de perfil. ${errUploadTask}`
        );
        this.isLoading.next(false);
      });
  }

  takePhoto() {
    this.cameraService
      .takePicture()
      .then(res => {
        this.profilePhotoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          res && res.dataUrl
        );
        this.isCameraPhoto = true;
      })
      .catch(() => {
        console.log('No se recibió ninguna imagen');
      });
  }

  svgToPng(imgTagSvg: any): string {
    var canvas = document.createElement('canvas');
    canvas.width = 662;
    canvas.height = 662;
    var ctx = canvas.getContext('2d');
    var img = imgTagSvg;
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    return dataUrl;
  }

  selectPhoto() {
    this.errorToast.next('La funcionalidad de seleccionar una foto desde la galería no se encuentra disponible aún');
  }

  private changePassword(newValue: string) {
    this.validationsForm.setControl(
      'repassword',
      new FormControl(
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern(newValue)
        ])
      )
    );
  }
}
