import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  logedIn = false;
  constructor(public auths:AngularFireAuth) {
    auths.user.subscribe(data=>{
      if(data?.uid != null) {
        this.logedIn = true;
      }else this.logedIn = false;
    })
   }

  ngOnInit(): void {
  }

}
