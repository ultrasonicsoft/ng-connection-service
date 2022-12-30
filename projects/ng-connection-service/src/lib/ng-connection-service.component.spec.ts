import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgConnectionServiceComponent } from './ng-connection-service.component';

describe('NgConnectionServiceComponent', () => {
  let component: NgConnectionServiceComponent;
  let fixture: ComponentFixture<NgConnectionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgConnectionServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgConnectionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
