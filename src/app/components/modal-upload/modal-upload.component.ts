import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {



  imagenSubir: File;

  imagenTemp: string;

  constructor(
      public _subirArchivoService: SubirArchivoService,
      public _modalUploadServie: ModalUploadService
  ) {


  }

  ngOnInit() {
  }



  cerrarModal() {

    this.imagenTemp  = null;
    this.imagenSubir = null;

    this._modalUploadServie.ocultarModal();


  }


  seleccionImagen( archivo: File) {

    if ( !archivo) {
    this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {

      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;

    }

    this.imagenSubir = archivo;
//  Puro javascritp
    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    // tslint:disable-next-line:prefer-const
    let urlImagenTemp = reader.readAsDataURL( archivo);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();



  }

  subirImagen() {

    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadServie.tipo, this._modalUploadServie.id)
      .then( resp => {


        this._modalUploadServie.notificacion.emit( resp);
       this.cerrarModal();



      })
      .catch( err => {

        console.log('Error en la carga.....');
      });

  }

}
