import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales:  Hospital[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe( () => this.cargarHospitales());
  }

  buscarHospital( termino: string) {

    if ( termino.length <= 0) {

      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino)
     .subscribe( hospitales => this.hospitales = hospitales );

  }



  cargarHospitales() {

    this.cargando  = true;
    this._hospitalService.cargarHospitales(this.desde)
        // .subscribe( hospitales => this.hospitales = hospitales);
        .subscribe( (hospitales: any) => {

          console.log(hospitales);
          this.totalRegistros = hospitales.total;
          this.hospitales = hospitales;
          this.cargando = false;

        });
      }


  cambiarDesde ( valor: number) {

    // tslint:disable-next-line:prefer-const
    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {

      return ;
    }

    if (desde < 0 ) {

      return;

    }

    this.desde += valor;
    this.cargarHospitales();
  }



  guardarHospital( hospital: Hospital) {

    this._hospitalService.actualizarHospital( hospital)
      .subscribe();

  }

  borrarHospital( hospital: Hospital) {

   swal({

    title: '¿Esta seguro?',
    text: 'Estga a punto de borrar el hospital ' + hospital.nombre,
    icon: 'warning',
    buttons: true,
    dangerMode: true
   })
   .then( borrar => {

    if (borrar) {

      this._hospitalService.borrarHospital( hospital._id)
      .subscribe( borrado => {
        console.log(borrado);
        this.cargarHospitales();
      });
    }

   });
  }

  crearHospital() {

    swal({

      title: 'Crear hospital',

      text: 'Ingrese el nombre del hospital',

      content: {

        element: 'input',

        attributes: {

          placeholder: '',

          type: 'text',

        },

      },

      icon: 'info',

      buttons: ['Cancelar', 'Guardar'],

      dangerMode: true

    }).then( (valor: string) => {

      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor)
        .subscribe( () => this.cargarHospitales());

    });
  }

  actualizarImagen( hospital: Hospital) {


    this._modalUploadService.mostarModal( 'hospitales', hospital._id);



  }

}
