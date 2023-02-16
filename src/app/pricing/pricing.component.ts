import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { user } from '@angular/fire/auth';

declare var Razorpay: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  firestore: AngularFirestore;
  logedIn:boolean =false;
  constructor(private auth: AuthService, fStore: AngularFirestore, public auths: AngularFireAuth, private storage: AngularFireStorage, private router: Router) {
    this.firestore = fStore;
    auths.user.subscribe(data=>{
      if(data?.uid != null) {
        this.logedIn = true;
      }else this.logedIn = false;
    })


  }

  ngOnInit(): void {
  }

  razorPayOptions = {
    "key" : "rzp_test_q0FLy0FYnKC94V",
    "amount": "15000",
    "name": "Test",
    "description": "Testing Product",
    "order_id": "123",
    "handler" : (res: any) => {
      console.log(res);
    }
  }

  razor_pay1() {
    



    // this.auths.user.subscribe(async (user) => {
    //   this.firestore
    //     .collection("users").doc(user?.uid)
    //     .get()
    //     .subscribe((data) => {
    //       console.log(data.data());
    //     }

    //     );
    // });

  };

  razor_pay2() {
    console.log('2');
  }

  razor_pay3() {
    console.log('3');
  }

}
