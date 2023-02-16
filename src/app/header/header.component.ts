
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router'; 
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    register1 = true;
    login1 = true;
    logout1 = false;
    isLogedin = false;
  constructor(private auth : AuthService, public fire: AngularFireAuth , public  store:AngularFirestore,private router :Router ) {
      interface Items {
        id?: string,
      }
      const item :Items = {id:'jijiji'};
      fire.user.subscribe(user=> {
        if(user) {

          this.isLogedin = true;
        }else{
          this.isLogedin = false;
          
        }
         
        console.log(this.isLogedin);
        // store.collection('users').doc(user?.uid).collection<Items>('name').add(item).then(hi=> {
          if(this.isLogedin) {
            // router.navigate(['/dashboard']);
          }
          
        // });
        
      })
     
   }
//   auth1=getAuth();
  ngOnInit(): void {
    this.navbarCollapse();
    
  }

//   loggedIn(){
//     return localStorage.getItem('token');
//   }

  logout() {
    this.auth.logout()
    this.register1 = true;
    this.login1 = true;
    this.logout1 = false;
    this.isLogedin = false;
  }


  navbarCollapse(){
    document.addEventListener('DOMContentLoaded', function() {
      // open
      const burger = document.querySelectorAll('.navbar-burger');
      const menu = document.querySelectorAll('.navbar-menu');
  
      if (burger.length && menu.length) {
          for (var i = 0; i < burger.length; i++) {
              burger[i].addEventListener('click', function() {
                  for (var j = 0; j < menu.length; j++) {
                      menu[j].classList.toggle('hidden');
                  }
              });
          }
      }
  
      // close
      const close = document.querySelectorAll('.navbar-close');
      const backdrop = document.querySelectorAll('.navbar-backdrop');
  
      if (close.length) {
          for (var i = 0; i < close.length; i++) {
              close[i].addEventListener('click', function() {
                  for (var j = 0; j < menu.length; j++) {
                      menu[j].classList.toggle('hidden');
                  }
              });
          }
      }
  
      if (backdrop.length) {
          for (var i = 0; i < backdrop.length; i++) {
              backdrop[i].addEventListener('click', function() {
                  for (var j = 0; j < menu.length; j++) {
                      menu[j].classList.toggle('hidden');
                  }
              });
          }
      }
  });
  }
  closeNav() {
    // document.getElementById("mySidenav")!.style.width = "0";
    // document.getElementById("mySidenav")!.style.marginLeft = "-1000";
    document.getElementById("mySidenav1")!.style.display = "none";
  }
  openNav() {
    // document.getElementById("mySidenav1")!.style.width = "0";
    // document.getElementById("mySidenav1")!.style.marginLeft = "-1000";
    document.getElementById("mySidenav1")!.style.display = "block";
  }
}
