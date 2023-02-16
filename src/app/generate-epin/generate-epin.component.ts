import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-generate-epin',
  templateUrl: './generate-epin.component.html',
  styleUrls: ['./generate-epin.component.css']
})
export class GenerateEpinComponent implements OnInit {
  firestore : AngularFirestore;

  phone_no : string = '';
  password : string = '';
  otp : string = '';
  otp_test : string = '';
  otp_verified : boolean = false;

  
  constructor(private auth : AuthService,fStore:AngularFirestore , public auths:AngularFireAuth,private storage:AngularFireStorage ,private router:Router ) {
    this.firestore = fStore;
    // this.auths.user.subscribe(user=>{

    //   this.firestore.collection('users').doc(user?.uid+"/otherInfo/nominee").get().subscribe(data=>{
    //     if(data.exists) {
    //       this.router.navigate(['/profile-details']);
    //     }
    //   });

    //  });
   }
  ngOnInit(): void {
  }

  generate_epin() {

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    if(this.phone_no == '') {
      alert('Please enter otp');
      return;
    }

    if(this.otp == '') {
      alert('Please enter otp');
      return;
    }

    if(this.otp_verified == false) {
      alert('Please verify otp');
      return;
    }
    
    // this.auth.login(this.phone_no,this.password);

    this.auths.user.subscribe(user=>{

      
      const user_doc = this.firestore.collection('users').doc(user?.uid);
      const e_pin = { epin: this.phone_no };
      user_doc.update(e_pin);

      });
    
    this.router.navigate(['/transfer-E-pin']);

    // this.phone_no = '';
    // this.password = '';

  }

  async send_otp() {

    if(this.phone_no == '') {
      alert('Please enter phone number');
      return;
    }

    
    this.otp_test = await this.auth.send_otp(this.phone_no);
    
    // this.phone_no = '';

  }

  verify_otp() {
    if(this.otp == '') {
      alert('Please enter phone number');
      return;
    }

    if(this.otp == this.otp_test) {
      alert('OTP verified');
      this.otp_verified = true;
      return;
    }

    if(this.otp != this.otp_test) {
      alert('OTP Wrong');
      console.log(this.otp_test);
      return;
    }

  }

}
