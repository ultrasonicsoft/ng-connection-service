import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAngularQrcodeComponent } from './ngx-angular-qrcode.component';

describe('NgxAngularQrcodeComponent', () => {
  let component: NgxAngularQrcodeComponent;
  let fixture: ComponentFixture<NgxAngularQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAngularQrcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxAngularQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
