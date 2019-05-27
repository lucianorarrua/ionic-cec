import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../shared/models/user.model';
import { FirestorageUsersService } from './firestorage-users.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth, private userDataBase: FirestorageUsersService) {
  }

  registerUser(value: { name: string, surname: string, email: string, password: string, repassword: string }, base64ProfileImage: any) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.angularFireAuth.auth.currentUser) {
        this.angularFireAuth.auth.signOut()
          .then(() => {
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails(firebaseUser: firebase.User): Promise<User> {
    return new Promise<any>((resolve, reject) => {
      this.userDataBase.getUsers().subscribe(data => {
        data.filter((user) => {
          console.log('aca si', user);

          if (user.uid === firebaseUser.uid) {
            resolve(user);
          }
        });
      }, error => {
        reject(error);
      })
    })
  }

  currentUser(): firebase.User {
    return this.angularFireAuth.auth.currentUser;
  }

  getSpanishError(error) {
    switch (error.code) {
      // https://firebase.google.com/docs/reference/js/firebase.auth.Error
      case 'auth/email-already-in-use':
        return "Este correo ya está siendo usado por otro usuario"
      case 'auth/user-disabled':
        return "Este usuario ha sido deshabilitado"
      case 'auth/operation-not-allowed':
        return "Operación no permitida"
      case 'auth/invalid-email':
        return "Correo electrónico no valido"
      case 'auth/wrong-password':
        return "Contraseña incorrecta"
      case 'auth/invalid-password':
        return "Contraseña no válida"
      case 'auth/user-not-found':
        return "No se encontró cuenta del usuario con el correo especificado"
      case 'auth/network-error':
        return "Promblema al intentar conectar al servidor"
      case 'auth/network-request-failed':
        return "Promblema al intentar conectar al servidor"
      case 'auth/weak-password':
        return "Contraseña muy debil o no válida"
      case 'auth/missing-email':
        return "Hace falta registrar un correo electrónico"
      case 'auth/internal-error':
        return "Error interno"
      case 'auth/invalid-custom-token':
        return "Token personalizado invalido"
      case 'auth/invalid-user-token':
        return "El token de usuario ya no es válida. Inicie sesión nuevamente"
      case 'user-token-expired':
        return "El token de usuario ha expirado. Inicie sesión nuevamente"
      case 'auth/too-many-requests':
        return "Ya se han enviado muchas solicitudes al servidor. Intente más iniciar sesión mas tarde."
      case 'auth/project-not-found':
        return "No se encontró el servidor de Como en casa. Probablemente este no esté disponible actualmente. Intente mas tarde o pongase en contacto con el equipo de Como en casa para obtener una respuesta al problema"
      default:
        return `Se ha producido un error. Código de error: {{error.code}}. Pongase en contacto con el equipo de Como en Casa para solucionar el problema`
    }
  }
}
