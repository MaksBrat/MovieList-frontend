import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  slides = [
    { img: 'https://img.zorores.com/_r/1366x768/100/58/d0/58d0b99666b285d2c484fec5dfaa23f0/58d0b99666b285d2c484fec5dfaa23f0.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/a8/f1/a8f13cd393e9f17c64d90c9fa6e79cdd/a8f13cd393e9f17c64d90c9fa6e79cdd.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/a1/2b/a12b53c5fb76bad339bfb2808b607ffd/a12b53c5fb76bad339bfb2808b607ffd.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/9d/72/9d728e112dc3732b0b6d56ca9fa69cc8/9d728e112dc3732b0b6d56ca9fa69cc8.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/33/d9/33d9bbf870518a5e551653245218ba62/33d9bbf870518a5e551653245218ba62.jpg' },
    { img: 'https://img.zorores.com/_r/1366x768/100/8e/18/8e18cd08d3109c8293b6bce1f15abdbb/8e18cd08d3109c8293b6bce1f15abdbb.jpg' },
  ];
  slideConfig = { 
    slidesToShow: 1, 
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    waitForAnimate: false,
  };
  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }
  constructor() {}
  ngOnInit(): void {}
}
