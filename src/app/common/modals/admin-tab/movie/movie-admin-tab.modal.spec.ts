import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAdminTabModal } from './movie-admin-tab.modal';

describe('AdminTabComponent', () => {
  let component: MovieAdminTabModal;
  let fixture: ComponentFixture<MovieAdminTabModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieAdminTabModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieAdminTabModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
