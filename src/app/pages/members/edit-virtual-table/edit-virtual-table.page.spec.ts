import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVirtualTablePage } from './edit-virtual-table.page';

describe('EditVirtualTablePage', () => {
  let component: EditVirtualTablePage;
  let fixture: ComponentFixture<EditVirtualTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVirtualTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVirtualTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
