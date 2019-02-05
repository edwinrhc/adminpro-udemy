import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  // ============================
  // tslint:disable-next-line:comment-format
  //TODO: Cargar varios medicos
  // ============================
  cargarMedicos() {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/medico';
    return this.http.get( url)
        .pipe(map( (resp: any) => {

          this.totalMedicos = resp.total;
          return resp.medicos;

        }));


  }
    // ============================
  // tslint:disable-next-line:comment-format
  //TODO: Cargar un medico
  // ============================
  cargarMedico( id: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
          .pipe(map( (resp: any) => resp.medico ));

  }

  // ============================
  // tslint:disable-next-line:comment-format
  //TODO: Buscar Medicos
  // ============================

  buscarMedicos( termino: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url)
            .pipe(map( (resp: any) => resp.medicos ));
  }

  // ============================
  // tslint:disable-next-line:comment-format
  //TODO: Borrar Medicos
  // ============================
  borrarMedicos( id: string ) {

  let url = URL_SERVICIOS + '/medico/' + id;
  url += '?token=' +  this._usuarioService.token;

  return this.http.delete(url)
      .pipe(map ( (resp: any) => {

        swal(' Médico Borrado', 'Médico borrado correctamente', 'success');

        return resp;
      }));


  }

  // ============================
  // tslint:disable-next-line:comment-format
  //TODO: Guardar Medico
  // ============================

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    // Hacemos una pequeña validación

    if ( medico._id) {
// actualizando
   url += '/' + medico._id;
   url += '?token=' + this._usuarioService.token;

   return this.http.put( url, medico)
         .pipe(map( (resp: any) => {

          swal('Médico Actualizado', medico.nombre, 'success');
          return resp.medico;


         }));

    } else {

      // Creando
      url += '?token=' + this._usuarioService.token;
     return this.http.post( url, medico)
          .pipe(map( (resp: any) => {

            swal('Médico Creado', medico.nombre, 'success');
            return resp.medico;

          }));

    }



  }
}
