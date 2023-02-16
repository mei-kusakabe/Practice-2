import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { User } from '../models/User';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  user_transfer_arr: any = [

  ]

  left:number=0;
  right:number=0;
  number_of_payer_left:number=0;
  items?:User[] = new Array<User>;
  itemsAll:User[] = new Array<User>;
  myUID?:string;

  joining_date?:string;
  expiry_date_:boolean = false;
  expiry_date?:string = '10/2/2023'

  firestore: AngularFirestore;

  price: string = "Select Course";
  recp_id: string = '';
  recp_name: string = '';
  course_n: string = '';
  amount: string = '';
  plan?:string;
  Commission?:string;

  constructor(public afs:AngularFirestore,public auth:AngularFireAuth ,private fStore: AngularFirestore, public auths: AngularFireAuth, private storage: AngularFireStorage, private router: Router) { 
    auth.user.subscribe(user=>{
      this.joining_date = user?.metadata.creationTime;
      fStore.collection<User>('users').doc(user?.uid).valueChanges().subscribe(
        data=>{
          if(data?.isPremium) {
            this.expiry_date_ = true;
            this.expiry_date = data.expiry
            this.plan = data.plan
            this.Commission = data.Commission
          }
        }
      )
    })
    this.firestore = fStore;

  }

  ngOnInit(): void {
    this.auth.user.subscribe
    (user=>{
      this.traverse(user?.uid)
      this.myUID = user?.uid
              this.afs.collection('users')
                              .doc(user?.uid)
                                      .valueChanges().forEach(
                                        data=>{
                                          // console.log(data)
                                        }
                                      )
           }
    )

    
    
  }

  async traverse(id?:string) {
    this.afs.collection('users').doc(id).collection<Tree>('tree').doc('childs').valueChanges().subscribe(data => {
      if (data?.left != undefined) {
        console.log("check ",id);
        if(data.left == id) {
          this.afs.collection('users').doc(id).collection<Tree>('tree').doc('childs').set({left:''},{merge:true});
        }
        this.checkLeftRight(id!);
        this.left = this.left + 1;
        this.afs.collection<User>('users').doc(data.left).valueChanges().forEach(
          datac => {
            if (!this.items!.some(({ email }) => email == datac?.email)) {
              if (datac?.invitationid == this.myUID) {
                datac!.uID = data.right;
                // this.user_transfer_arr.push(datac!);
                this.items?.push(datac!);
              }
              datac!.uID = data.right;
              this.user_transfer_arr.push(datac!);
              this.itemsAll?.push(datac!);
            }
          }
        );
        this.traverse(data.left);
      } if (data?.right != undefined) {
        console.log("check ",id);
        // console.log(data.right);
        if(data.right == id) {
          this.afs.collection('users').doc(id).collection<Tree>('tree').doc('childs').set({right:''},{merge:true});
        }
        this.checkLeftRight(id!);
        this.afs.collection<User>('users').doc(data.right).valueChanges().forEach(
          datac => {

            if (!this.items!.some(({ email }) => email == datac?.email)) {
              if (datac?.invitationid == this.myUID) {
                datac!.uID = data.right;
                // console.log(datac!);

                this.items?.push(datac!);
              }
              // console.log(this.itemsAll)
              datac!.uID = data.right;
              // console.log(datac!);
              this.user_transfer_arr.push(datac!);
              this.itemsAll?.push(datac!);
            }
          }
        );
        this.right = this.right + 1;
        this.traverse(data.right);

      }
    })
    
   
  }
  async checkLeftRight(id:string) {
    this.afs.collection('users').doc(id).collection<Tree>('tree').doc('childs').valueChanges().subscribe(data=>{
      if(data?.left==undefined||data?.right==undefined) {
        this.number_of_payer_left = this.number_of_payer_left+1
      }
    }
    )
    
  }

  add_transfer_user() {
  
          this.itemsAll.forEach(element => {
            console.log(element)
            this.user_transfer_arr.push(element);
          });
        
    console.log(this.user_transfer_arr);
 
};

}

interface Tree {
  right?:string;
  left?:string;
}
