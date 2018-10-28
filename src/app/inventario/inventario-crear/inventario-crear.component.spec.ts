import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioCrearComponent } from './inventario-crear.component';

describe('InventarioCrearComponent', () => {
  let component: InventarioCrearComponent;
  let fixture: ComponentFixture<InventarioCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
