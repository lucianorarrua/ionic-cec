import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { FirebaseAuthenticationService } from './firebase-authentication.service';
import { SafeResourceUrl } from '@angular/platform-browser';

const TOKEN_KEY = 'auth-token';
const USERAUTH = 'user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /*  **  BehaviorSubject es un observable al que nos podeos suscribir y nos va a aisar cuando authenticationState cambie de valor. El valor
      lo cambiamos con el método .next();
      **  storage es una variable que contiene al plugin capacitor-data-storage-sqlite. La mayoría de sus métodos son promesas a las que hay
      que implementarles un callback.
      */
  // El BehaviorSubject arranca en falso.
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private platform: Platform, private firebaseAuthenticationService: FirebaseAuthenticationService) {

    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(USERAUTH).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  login(value) {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuthenticationService.loginUser(value).then((res) => {
        this.storage.set(USERAUTH, JSON.stringify(res.user)).then(() => {
          this.authenticationState.next(true);
          resolve(res);
        });
      }).catch((err) => reject(err))

    })
  }

  register(value: { name: string, surname: string, email: string, password: string, repassword: string }, profilePhoto: SafeResourceUrl) {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuthenticationService.registerUser(value, profilePhoto).then((res) => {
        resolve(res);
      }).catch((err) => reject(err))
    })
  }

  logout() {
    return this.storage.remove(USERAUTH).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  currentUser(): Promise<string> {
    return this.storage.get(USERAUTH);
  }
}