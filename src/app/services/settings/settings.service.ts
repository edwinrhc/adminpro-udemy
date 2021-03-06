import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes  = {
//   Propiedades por defecto que vamos a tener
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };


  constructor( @Inject(DOCUMENT) private _document) {

    this.cargarAjustes();
   }

  guardarAjustes() {

    // console.log('Guardado en el LocalStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {

    if ( localStorage.getItem('ajustes')) {

      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('Cargando del LocalStorage');

      this.aplicarTema( this.ajustes.tema);

    } else {

      this.aplicarTema( this.ajustes.tema);
      // console.log('Usando valores por defecto');
    }

  }

 aplicarTema( tema: string ) {

  // tslint:disable-next-line:prefer-const
  let url = `assets/css/colors/${tema}.css`;
  this._document.getElementById('tema').setAttribute('href', url);

  this.ajustes.tema = tema;
  this.ajustes.temaUrl = url;

  this.guardarAjustes();


  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
