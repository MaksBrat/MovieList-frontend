import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingChartComponent } from './rating-chart.component';

describe('RatingChartTsComponent', () => {
  let component: RatingChartComponent;
  let fixture: ComponentFixture<RatingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
