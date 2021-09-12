import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import {  debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { AccionesService } from './acciones.service';


const ESPERA_DIGITADO=300;

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css'],
})
export class AccionesComponent implements OnInit, OnDestroy {
  accionesInput = new FormControl();
  // acciones: Acciones;
  // private subcription: Subscription;

  ///// usando pipe async
  // acciones$ = this.accionesService.getAcciones(); // 
  
  //// uso de filtrado input
  // acciones$= this.accionesInput.valueChanges.pipe(
  //   // tap(console.log),
  //   switchMap((valorDigitado) => this.accionesService.getAcciones(valorDigitado))
  // );
  

  todasAcciones = this.accionesService.getAcciones();
  filtroInput$ = this.accionesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITADO), //tiempo de espera
    filter((x) => x.length >= 3 || !x.length ),///mejorar para no ir a buscar siempre sino a partir de la 3 letra o ninguna letra
    distinctUntilChanged(),// no ir al server si es igual el valor es igual al valor q estamos enviando
    switchMap((valorDigitado) => this.accionesService.getAcciones(valorDigitado))
  );
  
  acciones$ =  merge(this.todasAcciones, this.filtroInput$);

  constructor(private accionesService: AccionesService) {

  }
  
  ngOnInit(): void {

  //  this.subcription = this.accionesService.getAcciones().subscribe((retornoApi)=> {
  //     this.acciones= retornoApi;
  //   });    
    
  }


  ngOnDestroy(): void {
    // this.subcription.unsubscribe();
    
  }

}