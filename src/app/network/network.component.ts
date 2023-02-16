import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { data } from 'jquery';
import { Observable, of } from 'rxjs';
import { Tree } from '../models/Tree';
import { User } from '../models/User';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})

export class NetworkComponent implements OnInit {
  user_transfer_arr: any = [
  ]
  user?:any[];
  left:number=0;
  right:number=0;
  number_of_payer_left:number=0;
  number_of_payer:number=0;
  items?:User[] = new Array<User>;
  itemsAll:User[] = new Array<User>;
  myUID?:string;
  constructor(public afs:AngularFirestore,public auth:AngularFireAuth) {
}
  //  joiningDate
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

  // start
  async traverse(id?:string) {
    this.afs.collection('users').doc(id).collection<Tree>('tree').doc('childs').valueChanges().subscribe(data => {
      if (data?.left != undefined) {
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
              this.afs.collection<User>('users').doc(datac?.uID).valueChanges().subscribe(data=>{
                datac!.profile = data?.profile;
              })
              this.user_transfer_arr.push(datac!);
              this.itemsAll?.push(datac!);
            }
          }
        );
        this.traverse(data.left);
      } if (data?.right != undefined) {
        console.log(data.right);
        this.checkLeftRight(id!);
        this.afs.collection<User>('users').doc(data.right).valueChanges().forEach(
          datac => {

            if (!this.items!.some(({ email }) => email == datac?.email)) {
              if (datac?.invitationid == this.myUID) {
                datac!.uID = data.right;
                // console.log(datac!);
                this.afs.collection<User>('users').doc(datac?.uID).valueChanges().subscribe(data=>{
                  datac!.profile = data?.profile;
                })
                this.items?.push(datac!);
              }
              // console.log(this.itemsAll)
              datac!.uID = data.right;
              console.log(datac!);
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
  //end
  async checkLeftRight(id:string) {
    this.afs.collection('users').doc(id).collection<Tree>('tree').doc('childs').valueChanges().subscribe(data=>{
      if(data?.left==undefined||data?.right==undefined) {
        this.number_of_payer_left = this.number_of_payer_left+1
      }else 
      if(data?.left!=undefined&&data?.right!=undefined) {
        this.number_of_payer = this.number_of_payer+1
      }
    }
    )
    
  }

  add_transfer_user() {
    console.log('RUNN')
  
          this.itemsAll.forEach(element => {
            console.log(element)
            this.user_transfer_arr.push(element);
          });
        
    console.log(this.user_transfer_arr);
 
};
}

