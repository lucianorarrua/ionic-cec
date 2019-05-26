import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterVirtualTableModalPage } from './enter-virtual-table-modal.page';

describe('EnterVirtualTableModalPage', () => {
  let component: EnterVirtualTableModalPage;
  let fixture: ComponentFixture<EnterVirtualTableModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterVirtualTableModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterVirtualTableModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
