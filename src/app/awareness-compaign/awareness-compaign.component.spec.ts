import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwarenessCompaignComponent } from './awareness-compaign.component';

describe('AwarenessCompaignComponent', () => {
  let component: AwarenessCompaignComponent;
  let fixture: ComponentFixture<AwarenessCompaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwarenessCompaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwarenessCompaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
