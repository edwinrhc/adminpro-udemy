import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {

    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  ngOnInit() {

    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  onChanges( newValue: number) {

   // tslint:disable-next-line:prefer-const
  //  let elemHTML:   any = document.getElementsByName('progreso')[0];
  //  console.log(this.txtProgress);

  //  console.log(elemHTML.value);

    if ( newValue >= 100 ) {

      this.progreso  = 100;
    } else if (newValue <= 0 ) {

      this.progreso = 0;

    } else {
    // O es un número entre 0 y 100
     this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);

  }

  cambiarValor( valor: number ) {

    this.progreso = this.progreso + valor;
    if ( this.progreso >= 100) {
      this.progreso = 100;
      return;
    }

    if ( this.progreso <= 0) {

      this.progreso = 0;
      return;
    }


    this.cambioValor.emit(this.progreso);

  }

}
