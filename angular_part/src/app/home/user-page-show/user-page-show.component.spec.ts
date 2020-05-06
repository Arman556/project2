import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageShowComponent } from './user-page-show.component';

describe('UserPageShowComponent', () => {
  let component: UserPageShowComponent;
  let fixture: ComponentFixture<UserPageShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
