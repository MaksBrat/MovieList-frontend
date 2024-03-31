import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent {
  url: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
      this.url = data.url;
  }
}


