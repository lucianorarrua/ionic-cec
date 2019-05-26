import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVirtualTablesPage } from './my-virtual-tables.page';

describe('MyVirtualTablesPage', () => {
  let component: MyVirtualTablesPage;
  let fixture: ComponentFixture<MyVirtualTablesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVirtualTablesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVirtualTablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
