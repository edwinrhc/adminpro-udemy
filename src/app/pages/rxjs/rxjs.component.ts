import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {


   this.subscription = this.regresaObservable()
   .subscribe(
      numero => console.log('Subs', numero ),
      error => console.error('Error en los obs', error),
      () => console.log('El obs se termino ')

    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {

    console.log('La página se va cerrar');
    this.subscription.unsubscribe();

  }


  regresaObservable(): Observable<any> {

      // tslint:disable-next-line:prefer-const
  return  new Observable( (observer: Subscriber<any>) => {

    // tslint:disable-next-line:prefer-const
    let contador = 0;
    // tslint:disable-next-line:prefer-const
    let intervalo = setInterval( () => {


      contador ++;

      const salida = {

        valor : contador

      };


      observer.next( salida );

      // if ( contador === 3) {

      //   clearInterval( intervalo );
      //   observer.complete();
      // }

      // if ( contador === 2 ) {

      //   // clearInterval( intervalo );
      //   observer.error('Auxilio');
      // }


    }, 1000);

  }).pipe(

    map( resp =>  resp.valor ),
    filter( ( valor, index ) => {

      // console.log('Filter', valor, index);
      if ( (valor % 2) === 1 ) {
        // Impar
        return true;
      } else {
        // Par
        return false;
      }

    })
  );



  }

}
