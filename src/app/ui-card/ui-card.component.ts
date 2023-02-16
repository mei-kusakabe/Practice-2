import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ui-card',
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.css']
})
export class UiCardComponent implements OnInit {

  constructor(public router:Router,public arout:ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.router.navigate(['/show-tree-view/'+this.arout.snapshot.params['parent']+'/tree']);
  }

}
