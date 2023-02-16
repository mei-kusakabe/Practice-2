import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTreeViewComponent } from './show-tree-view.component';

describe('ShowTreeViewComponent', () => {
  let component: ShowTreeViewComponent;
  let fixture: ComponentFixture<ShowTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTreeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
