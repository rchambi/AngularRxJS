import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-acciones',
  templateUrl: './card-acciones.component.html',
  styleUrls: ['./card-acciones.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CardAccionesComponent implements OnInit {
  @Input() accion: any;

  constructor() {}

  ngOnInit(): void {}
}
