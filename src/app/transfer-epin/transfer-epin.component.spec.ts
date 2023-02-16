import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEpinComponent } from './transfer-epin.component';

describe('TransferEpinComponent', () => {
  let component: TransferEpinComponent;
  let fixture: ComponentFixture<TransferEpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferEpinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferEpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
