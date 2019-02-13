import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

constructor(

  public _usuarioService: UsuarioService,
  public router: Router

) {}

  canActivate():  Promise<boolean> | boolean {

    console.log('Inicio de verifica Token Guard');

    // tslint:disable-next-line:prefer-const
    let token = this._usuarioService.token;
    // tslint:disable-next-line:prefer-const
    let payload = JSON.parse( atob( token.split('.')[1]));
    // tslint:disable-next-line:prefer-const
    let expirado = this.expirado(payload.exp);

    if ( expirado) {

      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }

   // ============================
  // tslint:disable-next-line:comment-format
  //TODO: Veri
  // ============================

  verificaRenueva( fechaExp: number ): Promise<boolean> {

    return new Promise( ( resolve, reject) => {


      // tslint:disable-next-line:prefer-const
      let tokenExp = new Date( fechaExp * 1000); // necesito milisengundos
      // tslint:disable-next-line:prefer-const
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000));

      // console.log(tokenExp);
      // console.log('//');
      // console.log(ahora);
      if ( tokenExp.getTime() > ahora.getTime()) {

        resolve(true);

      } else {

        this._usuarioService.renuevaToken()
        .subscribe( () => {
          resolve(true);

        }, () => {

          this.router.navigate(['/login']);
          reject(false);
        });
      }

    });


  }

  expirado( fechaExp: number) {

  // tslint:disable-next-line:prefer-const
  let ahora = new Date().getTime() / 1000;
  if ( fechaExp < ahora ) {
    return true;
  } else {
    return false;
  }
  }



}
