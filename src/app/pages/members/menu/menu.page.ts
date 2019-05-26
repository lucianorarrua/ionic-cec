import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/shared/models/user.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Color } from '@ionic/core';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {
  public appMainPages: Array<{ title: string; url: string; icon: string }>;
  public appSecondaryPages: Array<{ title: string; url: string; icon: string }>;
  profilePhoto: string;
  userData: User;
  private authUser: firebase.User;


  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private readonly afs: AngularFirestore,
    public toastController: ToastController


  ) {
  }

  ngOnInit() {
    this.initPropertyData();


    this.appMainPages = [
      {
        title: 'Home',
        url: '/members/menu/home',
        icon: 'home'
      },
      {
        title: 'Direcciones',
        url: '/members/menu/addresses',
        icon: 'pin'
      },
      {
        title: 'Mis pedidos',
        url: '/members/menu/orders',
        icon: 'cart'
      },
      {
        title: 'Favoritos',
        url: '/members/menu/favorites',
        icon: 'heart'
      },
      {
        title: 'Mi cuenta',
        url: '/members/menu/account',
        icon: 'contact'
      },
      {
        title: 'Ayuda',
        url: '/members/menu/help',
        icon: 'help-circle'
      }
    ];

    this.appSecondaryPages = [
      {
        title: 'Crear mesa virtual',
        url: '/members/menu/create-virtual-table',
        icon: 'pizza'
      },
      {
        title: 'Editar mesa virtual',
        url: '/members/menu/edit-virtual-table',
        icon: 'create'
      },
      {
        title: 'Ver mis mesas virtuales',
        url: '/members/menu/my-virtual-tables',
        icon: 'restaurant'
      }
    ];
  }

  private initPropertyData() {
    let usersCollection: AngularFirestoreCollection<User>;
    let users: Observable<User[]>;

    usersCollection = this.afs.collection<User>('users');
    users = usersCollection.valueChanges();
    this.profilePhoto = '../../../../assets/avatars/grandmother.svg';
    this.userData = new User('', '', '', 5.0, null);
    this.authService.currentUser().then(stringAuthUser => {
      this.authUser = JSON.parse(stringAuthUser);
      users.subscribe(users => {
        this.userData = users.find(user => user.uid === this.authUser.uid);
        this.appSecondaryPages[0].url = '/members/menu/create-virtual-table/' + this.authUser.uid;
        this.appSecondaryPages[1].url = '/members/menu/edit-virtual-table/' + this.authUser.uid;
        this.profilePhoto = this.userData.profilePhoto.url;
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

  openPage(p: string) {
    this.router.navigateByUrl(p);
  }

  logout() {
    this.authService.logout();
  }
}
