import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-epin',
  templateUrl: './transfer-epin.component.html',
  styleUrls: ['./transfer-epin.component.css']
})
export class TransferEpinComponent implements OnInit {
  firestore: AngularFirestore;

  price: string = "Select Course";
  recp_id: string = '';
  recp_name: string = '';
  course_n: string = '';
  amount: string = '';

  user_transfer_arr: any = [

  ]
  // This arrangement can be altered based on how we want the date's format to appear.


  constructor(private auth: AuthService, fStore: AngularFirestore, public auths: AngularFireAuth, private storage: AngularFireStorage, private router: Router) {
    this.firestore = fStore;

  }


  ngOnInit(): void {
this.add_transfer_user();
  }


  transfer_epin() {

    this.auths.user.subscribe(user => {

      if (this.recp_id == '') {
        alert('Please enter recepient_id');
        return;
      }

      if (this.recp_name == '') {
        alert('Please enter recepient_name');
        return;
      }

      switch (this.course_n) {
        case "Forex Market":
          this.amount = "15000";
          break;

        case "Indian Stock":
          this.amount = "15000";
          break;

        case "Combo Course":
          this.amount = "25000";
          break;

        default:
          break;
      }

      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let curr_date = `${day}/${month}/${year}`;
      let exp_date = `${day}/${month}/${year}`;


      const user_doc = this.firestore.collection('users').doc(this.recp_id);
      const is_premium = { isPremium: true };
      user_doc.update(is_premium);
      const data = {
        amt: this.amount,
        joined_date: curr_date,
        expiry_date: exp_date,
        course_name: this.course_n,
        recipient_name: this.recp_name
      };
      user_doc.update(data);


      const ref_doc = this.firestore.collection('users').doc(user?.uid).collection('referals');
      console.log(user?.uid)
      const ref_data = {
        transfer_date: curr_date,
        transfer_amount: this.amount,
        recipient_name: this.recp_name,
        expiry_before_transfer: curr_date,
        expiry_after_transfer: curr_date,
        epin: "12345"

      };
      ref_doc.add({ ...ref_data });
      this.user_transfer_arr.push(ref_data);
      
    });

    this.router.navigate(['/transfer-E-pin']);
  }

  add_transfer_user() {
    console.log('RUNN')
    this.auths.user.subscribe(async (user) => {
      this.firestore
        .collection("users").doc(user?.uid).collection("referals")
        .get()
        .subscribe((data) => {
          data.forEach(element => {
            console.log(element.data());
            this.user_transfer_arr.push(element.data());
          });
        }
        );
    });
    console.log(this.user_transfer_arr);

  }

  priceChange(option: any){
    console.log(option)
    if (option == "Forex Market") {
      this.price = "15000";
    }
    if (option == "Indian Stock") {
      this.price = "15000";
    }
    if (option == "Combo Course") {
      this.price = "25000";
    }
  }

}


