import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

/* Este guard trabaja conjuntamente con el servicio de autenticación. Cada vez que el usuario quiera acceder a una página,
 pasará primero por este guard que consulta al servicio de autenticación si tiene permiso o no. */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthenticationService) { }

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}

