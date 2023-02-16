import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  isLogedin = false;
  constructor(public auth:AuthService,public firebaseAuth:AngularFireAuth,public router:Router) { 

    firebaseAuth.user.subscribe(user=> {
      if(user) {

        this.isLogedin = true;
      }else{
        this.isLogedin = false;
        
      }
      
    })
   

  }

  ngOnInit(): void {
    const id=localStorage.getItem('sideMenu')
    console.log(id)
    if(id=='m1'){
      $('#m1').css('color', '#111111');
      $('#m1').css('background', '#CE992F');
  
      $('#m2').css('color', '#BBBBBB');
        $('#m2').css('background', '#1D1D1D');
        $('#m3').css('color', '#BBBBBB');
        $('#m3').css('background', '#1D1D1D');
        $('#m4').css('color', '#BBBBBB');
        $('#m4').css('background', '#1D1D1D');
        $('#m5').css('color', '#BBBBBB');
        $('#m5').css('background', '#1D1D1D');
        $('#m6').css('color', '#BBBBBB');
        $('#m6').css('background', '#1D1D1D');
    }
  
    if(id=='m2'){
      $('#m2').css('color', '#111111');
      $('#m2').css('background', '#CE992F');
  
      $('#m1').css('color', '#BBBBBB');
        $('#m1').css('background', '#1D1D1D');
        $('#m3').css('color', '#BBBBBB');
        $('#m3').css('background', '#1D1D1D');
        $('#m4').css('color', '#BBBBBB');
        $('#m4').css('background', '#1D1D1D');
        $('#m5').css('color', '#BBBBBB');
        $('#m5').css('background', '#1D1D1D');
        $('#m6').css('color', '#BBBBBB');
        $('#m6').css('background', '#1D1D1D');
    }
  
    if(id=='m3'){
      $('#m3').css('color', '#111111');
      $('#m3').css('background', '#CE992F');
  
      $('#m2').css('color', '#BBBBBB');
        $('#m2').css('background', '#1D1D1D');
        $('#m1').css('color', '#BBBBBB');
        $('#m1').css('background', '#1D1D1D');
        $('#m4').css('color', '#BBBBBB');
        $('#m4').css('background', '#1D1D1D');
        $('#m5').css('color', '#BBBBBB');
        $('#m5').css('background', '#1D1D1D');
        $('#m6').css('color', '#BBBBBB');
        $('#m6').css('background', '#1D1D1D');
    }
    if(id=='m4'){
      $('#m4').css('color', '#111111');
      $('#m4').css('background', '#CE992F');
  
      $('#m2').css('color', '#BBBBBB');
        $('#m2').css('background', '#1D1D1D');
        $('#m3').css('color', '#BBBBBB');
        $('#m3').css('background', '#1D1D1D');
        $('#m1').css('color', '#BBBBBB');
        $('#m1').css('background', '#1D1D1D');
        $('#m5').css('color', '#BBBBBB');
        $('#m5').css('background', '#1D1D1D');
        $('#m6').css('color', '#BBBBBB');
        $('#m6').css('background', '#1D1D1D');
    }
  
    if(id=='m5'){
      $('#m5').css('color', '#111111');
      $('#m5').css('background', '#CE992F');
  
      $('#m2').css('color', '#BBBBBB');
        $('#m2').css('background', '#1D1D1D');
        $('#m3').css('color', '#BBBBBB');
        $('#m3').css('background', '#1D1D1D');
        $('#m4').css('color', '#BBBBBB');
        $('#m4').css('background', '#1D1D1D');
        $('#m1').css('color', '#BBBBBB');
        $('#m1').css('background', '#1D1D1D');
        $('#m6').css('color', '#BBBBBB');
        $('#m6').css('background', '#1D1D1D');
    }
    if(id=='m6'){
      $('#m6').css('color', '#111111');
      $('#m6').css('background', '#CE992F');
  
      $('#m2').css('color', '#BBBBBB');
        $('#m2').css('background', '#1D1D1D');
        $('#m3').css('color', '#BBBBBB');
        $('#m3').css('background', '#1D1D1D');
        $('#m4').css('color', '#BBBBBB');
        $('#m4').css('background', '#1D1D1D');
        $('#m5').css('color', '#BBBBBB');
        $('#m5').css('background', '#1D1D1D');
        $('#m1').css('color', '#BBBBBB');
        $('#m1').css('background', '#1D1D1D');
    }
  }

  closeNav() {
    // document.getElementById("mySidenav")!.style.width = "0";
    // document.getElementById("mySidenav")!.style.marginLeft = "-1000";
    document.getElementById("mySidenav")!.style.display = "none";
  }

  fopenNav() {
    // document.getElementById("mySidenav")!.style.width = "280px";
    document.getElementById("mySidenav")!.style.display = "block";
  
}

onclick(id:any){
  
  localStorage.setItem('sideMenu',id)
}

logout() {
  this.auth.logout();
}

}
