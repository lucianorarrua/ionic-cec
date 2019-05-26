import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularItemComponent } from './circular-item.component';

describe('CircularItemComponent', () => {
  let component: CircularItemComponent;
  let fixture: ComponentFixture<CircularItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
