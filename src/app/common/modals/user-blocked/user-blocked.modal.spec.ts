import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlockedModal } from './user-blocked.modal';

describe('UserBlockedModal', () => {
  let component: UserBlockedModal;
  let fixture: ComponentFixture<UserBlockedModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBlockedModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBlockedModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
