import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteRightComponentComponent } from './invite-right-component.component';

describe('InviteRightComponentComponent', () => {
  let component: InviteRightComponentComponent;
  let fixture: ComponentFixture<InviteRightComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteRightComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteRightComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
