import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CapacitorDataStorageSqlitePlugin } from "capacitor-data-storage-sqlite";
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authenticationService.checkToken();
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      /* Esto lo que hace es verificar si el usuario está autenticado al momento de iniciar la aplicación, si este ya 
      está autenticado, lo manda directamente a la pantalla de home, en caso contrario, lo manda al login*/
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['members', 'menu', 'home']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });


  }
}
