import { Component, OnInit } from '@angular/core';
import { AboutService } from '../services/about.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  
  constructor(private aboutservice:AboutService) { 
    this.aboutservice.getItem().subscribe(items=>{
      console.log(items);
      if(items.length == 0) console.log("nothing");
     })
  }
  ngOnInit(): void {
   
  }

}
