import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeView2Component } from './tree-view2.component';

describe('TreeView2Component', () => {
  let component: TreeView2Component;
  let fixture: ComponentFixture<TreeView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeView2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
