import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAboutComponent } from './news-about.component';

describe('NewsAboutComponent', () => {
  let component: NewsAboutComponent;
  let fixture: ComponentFixture<NewsAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
