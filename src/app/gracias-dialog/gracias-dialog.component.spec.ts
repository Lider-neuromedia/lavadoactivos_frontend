import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraciasDialogComponent } from './gracias-dialog.component';

describe('GraciasDialogComponent', () => {
  let component: GraciasDialogComponent;
  let fixture: ComponentFixture<GraciasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraciasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraciasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
