import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { stringLength } from '@firebase/util';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { data, merge } from 'jquery';
import { updateProfile } from '@firebase/auth';
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firestore : AngularFirestore;
  arertdata :string = '';
   hi?:number = 0;
   alert = false;
   fileurl ?: string;
   images?:any[];
   isProfileUploaded?:boolean=false;
   uploadedProfile?:string;
  constructor(fStore:AngularFirestore , public auth:AngularFireAuth,private storage:AngularFireStorage ,public route:Router ) {
    this.firestore = fStore;
    this.alert = false;
    this.auth.user.subscribe(user=>{
      this.firestore.collection('users').doc(user?.uid+"/otherInfo/address").get().subscribe(data=>{
        if(data.exists) {
          // this.route.navigate(['/profile-details']);
        }
      });

     });
   
   }

   uploadFile(event:any,st:string) {
    const file = event.target.files[0];
    const filePath = 'PersonalDataOfUser/'+this.firestore.createId();
    // const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file)
    this.arertdata = st;
    this.alert = true;
   
    task.percentageChanges().subscribe(data=> {
      this.hi = data;
      console.log(data)
    })
    task.snapshotChanges().subscribe(data=>{
      data?.ref.getDownloadURL().then(data=>{
        console.log(data)
      })
    })

    
    
  }


  uploadFileProfile(event:any,st:string) {
    const file = event.target.files[0];
    const filePath = 'profile/'+this.firestore.createId();
    // const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file)
    this.arertdata = st;
    this.alert = true;
   
    task.percentageChanges().subscribe(data=> {
      this.hi = data;
      console.log(data)
    })
    task.snapshotChanges().subscribe(data=>{
      data?.ref.getDownloadURL().then(data=>{
        console.log(data)
        this.auth.user.subscribe(user=>{

          this.firestore.collection('users').doc(user?.uid).set({profile:data},{merge:true} );
          this.isProfileUploaded = true;
          console.log(data,"use",user?.uid)
          this.uploadedProfile = data;    
         });  
      })
    })

     
  }




  ngOnInit(): void {
    $('#c1').show();
    $('#c2').hide();$('#c3').hide();$('#c4').hide();
  }
  getNomineeInfo(val: NgForm['value']) {
    this.auth.user.subscribe(user=>{

      this.firestore.collection('users').doc(user?.uid+"/otherInfo/nominee").set(val);

     });
   
  }

  getBankDetails(valBank :NgForm['value']) {
    window.scrollTo(0, 0);
    this.auth.user.subscribe(user=>{

      this.firestore.collection('users').doc(user?.uid+"/otherInfo/bank").set(valBank);

     });
  }

  getAddress(val:NgForm['value']) {
    window.scrollTo(0, 0);
    console.log("done")
    this.auth.user.subscribe(user=>{

      this.firestore.collection('users').doc(user?.uid+"/otherInfo/address").set(val);

     });
  }
  getSecuriteDetails(val:NgForm['value']) {
    window.scrollTo(0, 0);
   console.log('khk')
    this.auth.user.subscribe(user=>{

      this.firestore.collection('users').doc(user?.uid+"/otherInfo/SecuriteDetails").set(val);
      this.firestore.collection('users').doc(user?.uid+"/otherInfo/SecuriteDetailsImages").set(val);
      this.route.navigate(['/profile-details']);

     });

  }
  btnClick(id:any){
    if(id=='c1'){
    $('#c2').show();
    $('#c1').hide();$('#c3').hide();$('#c4').hide();
    }
    if(id=='c2'){
      $('#c3').show();
      $('#c2').hide();$('#c1').hide();$('#c4').hide();
      }
      if(id=='c3'){
        $('#c4').show();
        $('#c2').hide();$('#c3').hide();$('#c1').hide();
        }
        window.scrollTo(0, 0)
  }
}

