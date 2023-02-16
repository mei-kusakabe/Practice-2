import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invite-left-component',
  templateUrl: './invite-left-component.component.html',
  styleUrls: ['./invite-left-component.component.css']
})
export class InviteLeftComponentComponent implements OnInit {

  constructor(public rout:ActivatedRoute) {
   console.log( rout.snapshot.params['id']);
   }

  ngOnInit(): void {
  }

}
