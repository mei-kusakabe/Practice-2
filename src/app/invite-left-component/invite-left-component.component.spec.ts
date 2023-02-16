import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteLeftComponentComponent } from './invite-left-component.component';

describe('InviteLeftComponentComponent', () => {
  let component: InviteLeftComponentComponent;
  let fixture: ComponentFixture<InviteLeftComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteLeftComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteLeftComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
