import { Component, Input, OnInit } from "@angular/core";
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { RatingService } from "src/app/services/rating.service";

@Component({
  selector: 'app-rating-chart',
  templateUrl: './rating-chart.component.html',
  styleUrls: ['./rating-chart.component.css']
})
export class RatingChartComponent implements OnInit{
  @Input() movieId: number;

  public chart: any;

  constructor(public ratingService: RatingService){}

  createChart(data){
    Chart.register(ChartDataLabels)

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['1','2','3','4','5','6','7','8','9','10'], 
	      datasets: [
          {
            data,
            backgroundColor: '#00FFB7',
            hoverBackgroundColor: "#27A874",
            borderRadius: 10 
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        scales: {
          x: {
            display: false
          },
          y: {
            position: 'right',
            reverse: true,
            grid: {
              display: false
            }
          },          
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title : () => null
           }
          },
          datalabels: {
            display: function(context) {
              var values = context.dataset.data as number[];
              var maxValue = Math.max(...values);
              return context.dataset.data[context.dataIndex] >= maxValue * 0.1;
            },
            anchor: 'end',
            align: 'start',
            color: '#202125',
            font: {
                weight: 'bold',            
            }
          }
        },
        elements: {
          bar: {
            backgroundColor: 'rgba(0, 0, 0, 0)'
          }
        }
      },
      
    });
  }

  ngOnInit(): void {
    this.ratingService.get(this.movieId).subscribe(response =>{
      var data = Object.keys(response).map(key => response[key]);
      this.createChart(data);
    });;   
  }
}
