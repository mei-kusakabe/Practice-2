import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  reffer?:string='';
  uid?:string='';
  url?:string;
  constructor(fStore:AngularFirestore , public auth:AngularFireAuth,private storage:AngularFireStorage ,public route:Router) {
    this.auth.user.subscribe(user=>{
      this.uid = user?.uid;
     });
    this.url =   window.location.origin
   }
   onclick(data:string) {
    this.reffer = this.uid+"/"+data;
   }
  ngOnInit(): void {
  }

}
