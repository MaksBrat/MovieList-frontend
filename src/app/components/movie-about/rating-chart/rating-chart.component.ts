import { Component } from '@angular/core';

@Component({
  selector: 'app-rating-chart.ts',
  templateUrl: './rating-chart.component.html',
  styleUrls: ['./rating-chart.component.css']
})
export class RatingChartComponent {
  ratings = {
    1: 70,
    2: 10,
    3: 34,
    4: 90,
    5: 66
  }

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Account A'
    },
    {
      data: [120, 455, 100, 340],
      label: 'Account B'
    },
    {
      data: [45, 67, 800, 500],
      label: 'Account C'
    }
  ];
  chartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  chartLegend: boolean = false;
  chartType: string = 'bar';

  ngOnInit(): void {
    this.chartData = [{ data: this.ratings, label: 'User Ratings' }];
  }
}
