import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAccionesComponent } from './card-acciones.component';

describe('StockCardComponent', () => {
  let component: CardAccionesComponent;
  let fixture: ComponentFixture<CardAccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
