import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleApiComponent } from './login.component';

describe('GoogleApiComponent', () => {
  let component: GoogleApiComponent;
  let fixture: ComponentFixture<GoogleApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
