import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVirtualTablePage } from './create-virtual-table.page';

describe('CreateVirtualTablePage', () => {
  let component: CreateVirtualTablePage;
  let fixture: ComponentFixture<CreateVirtualTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVirtualTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVirtualTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
