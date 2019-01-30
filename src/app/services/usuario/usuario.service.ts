import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {

    this.cargarStorage();

   }

   estaLogueado() {

    return ( this.token.length > 5 ) ? true : false;

   }


   cargarStorage() {

    if ( localStorage.getItem('token')) {

      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

   }




   guardarStorage( id: string, token: string, usuario: Usuario )  {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));


    this.usuario = usuario;
    this.token = token;
   }

   // ============================
  // tslint:disable-next-line:comment-format
  //TODO:  Deslogearse
  // ============================
   logout() {
     this.usuario = null;
     this.token = '';

     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     this.router.navigate(['/login']);
   }

 // ============================
  // tslint:disable-next-line:comment-format
  //TODO:  Login con Google
  // ============================
   loginGoogle( token:  string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token })
          .pipe(map( (resp: any) => {
            this.guardarStorage( resp.id, resp.token, resp.usuario );

            return true;
          }));



   }


 // ============================
  // tslint:disable-next-line:comment-format
  //TODO:  Login Usuario
  // ============================
  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {

      localStorage.setItem('email', usuario.email);
    } else {

      localStorage.removeItem('email');

    }


    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario )
        .pipe(map( (resp: any) => {

          this.guardarStorage( resp.id, resp.token, resp.usuario );

          return true;


        }));

  }




  // ============================
  //  Crear Usuario
  // ============================
   crearUsuario( usuario: Usuario ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/usuario';

   return  this.http.post(url, usuario )
           .pipe(map ( (resp: any) => {

            swal('Usuario Creado', usuario.email, 'success');
            return resp.usuario;

           }));
   }

     // ============================
  // tslint:disable-next-line:comment-format
  //TODO: Actualizar Usuario
  // ============================

  actualizarUsuario( usuario: Usuario) {


  // tslint:disable-next-line:prefer-const
  let url = URL_SERVICIOS + '/usuario/' + usuario._id;
  url += '?token=' + this.token;

  console.log(url);

    return this.http.put( url, usuario)

      .pipe(map( (resp: any) => {


        if ( usuario._id === this.usuario._id) {


          // tslint:disable-next-line:prefer-const
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( usuarioDB._id, this.token, usuarioDB);

        }

        swal('Usuario actualizado', usuario.nombre, 'success');

        return true;
      }));


  }

  cambiarImagen( archivo: File, id: string ) {
  // llamamos a subir Archivo
  this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
    .then( (resp: any) => {

      this.usuario.img = resp.usuario.img;
      swal('Imagen Actualizada', this.usuario.nombre, 'success');

      this.guardarStorage(id, this.token, this.usuario);

    })
    .catch( resp => {

      console.log(resp);
    });

  }

  cargarUsuarios( desde: number = 0) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/usuario?desde=' + desde ;

    return this.http.get(url);

  }


       // ============================
  // tslint:disable-next-line:comment-format
  //TODO: Buscar Usuario
  // ============================

  buscarUsuarios( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url)
            .pipe(map( (resp: any) => resp.usuarios ));


  }

   // ============================
  // tslint:disable-next-line:comment-format
  //TODO: Borrar Usuario
  // ============================
  borrarusuarios( id: string ) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
        .pipe(map( resp => {

          swal('Usuario borraro', 'El usuario a sido elimiando correctamente', 'success');
          return true;

        }));

  }

}
