import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Videos } from '../models/Videos';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  arr:any[]=[];
  constructor(public afs:AngularFirestore) {
    this.afs.collection<Videos>('ourVideos').valueChanges().forEach(data=>{
      this.arr = data;
    })
   }

  ngOnInit(): void {
  }

}
