import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyFlitersComponent } from './apply-fliters.component';

describe('ApplyFlitersComponent', () => {
  let component: ApplyFlitersComponent;
  let fixture: ComponentFixture<ApplyFlitersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyFlitersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyFlitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
