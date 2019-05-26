import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListPage } from './modal-list.page';

describe('ModalListPage', () => {
  let component: ModalListPage;
  let fixture: ComponentFixture<ModalListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
