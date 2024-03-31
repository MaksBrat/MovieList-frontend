import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewsComponent } from './create-news.component';

describe('CreatenewsComponent', () => {
  let component: CreatenewsComponent;
  let fixture: ComponentFixture<CreatenewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
