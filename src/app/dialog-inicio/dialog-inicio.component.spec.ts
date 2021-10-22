import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInicioComponent } from './dialog-inicio.component';

describe('DialogInicioComponent', () => {
  let component: DialogInicioComponent;
  let fixture: ComponentFixture<DialogInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
