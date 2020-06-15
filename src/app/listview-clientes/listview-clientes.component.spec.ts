import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListviewClientesComponent } from "./listview-clientes.component";

describe("ListviewClientesComponent", () => {
  let component: ListviewClientesComponent;
  let fixture: ComponentFixture<ListviewClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListviewClientesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListviewClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
