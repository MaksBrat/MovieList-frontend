import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeAboutComponent } from './anime-about.component';

describe('AnimeAboutComponent', () => {
  let component: AnimeAboutComponent;
  let fixture: ComponentFixture<AnimeAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
