import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasDialogComponent } from './preguntas-dialog.component';

describe('PreguntasDialogComponent', () => {
  let component: PreguntasDialogComponent;
  let fixture: ComponentFixture<PreguntasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
