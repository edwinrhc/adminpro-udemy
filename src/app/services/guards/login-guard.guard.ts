import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioServie: UsuarioService,
    public router: Router ) {

  }

  canActivate() {

    if ( this._usuarioServie.estaLogueado()) {

      console.log('Paso por el Login Guard');
      return true;

    } else {
      console.log('Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }


    return true;


  }
}
