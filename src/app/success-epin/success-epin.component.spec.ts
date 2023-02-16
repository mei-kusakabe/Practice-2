import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessEpinComponent } from './success-epin.component';

describe('SuccessEpinComponent', () => {
  let component: SuccessEpinComponent;
  let fixture: ComponentFixture<SuccessEpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessEpinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessEpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
