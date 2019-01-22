import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
// Libreia creada
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  recuerdame: boolean = false;
// Declaramos auth2 para tener la informacion del token profile en fin
  auth2: any;

  constructor(
              public router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {

    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {

      this.recuerdame = true;

    }
  }

//  TODO: googleInit
    googleInit() {

      gapi.load('auth2', () => {

        this.auth2 = gapi.auth2.init({

          client_id : '481894897498-fbsr4l1r42gnetem033jfsp6smdncqjf.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'

        });

        this.attachSingin( document.getElementById('btnGoogle'));
      });

  }

  // Va recibir un elemento HTML
    attachSingin( element) {

      this.auth2.attachClickHandler( element, {}, (googleUser) => {

        // tslint:disable-next-line:prefer-const
        // let profile = googleUser.getBasicProfile();
        // tslint:disable-next-line:prefer-const
        let token = googleUser.getAuthResponse().id_token;

        this._usuarioService.loginGoogle( token )
          .subscribe(  () => window.location.href = '#/dashboard');

        console.log(token);


      });


  }




  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    // tslint:disable-next-line:prefer-const
    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
          .subscribe( correcto => this.router.navigate(['/dashboard']));


  }

}
