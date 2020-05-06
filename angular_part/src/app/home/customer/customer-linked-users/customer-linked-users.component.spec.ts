import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLinkedUsersComponent } from './customer-linked-users.component';

describe('CustomerLinkedUsersComponent', () => {
  let component: CustomerLinkedUsersComponent;
  let fixture: ComponentFixture<CustomerLinkedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLinkedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLinkedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
