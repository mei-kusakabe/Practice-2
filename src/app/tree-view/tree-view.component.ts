import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';

import * as $ from 'jquery'
import { User } from '../models/User';
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
   myid?:string='';
   parent?:string;
  static bool:boolean ;
   isPremium:boolean = false;

    stack:string[] = new Array<string>();
   left:string='';

    left_left:string='';
    left_right:string='';
     left_left_left:string='';
     left_left_right:string='';
     left_right_left:string='';
     left_right_right:string='';

     left_?:boolean;
     left_left_?:boolean;
     left_right_?:boolean;
     left_left_left_?:boolean;
     left_left_right_?:boolean;
     left_right_left_?:boolean;
     left_right_right_?:boolean;

     parent_i ?:boolean;
     left_i?:boolean;
     left_left_i?:boolean;
     left_right_i?:boolean;
     left_left_left_i?:boolean;
     left_left_right_i?:boolean;
     left_right_left_i?:boolean;
     left_right_right_i?:boolean;


   right:string = ''
    right_left:string='';
    right_right:string='';
      right_left_left:string='';
      right_left_right:string='';
      right_right_left:string='';
      right_right_right:string='';
      
      right_?:boolean
      right_left_?:boolean;
      right_right_?:boolean;
      right_left_left_?:boolean;
      right_left_right_?:boolean;
      right_right_left_?:boolean;
      right_right_right_?:boolean;

      right_i?:boolean
      right_left_i?:boolean;
      right_right_i?:boolean;
      right_left_left_i?:boolean;
      right_left_right_i?:boolean;
      right_right_left_i?:boolean;
      right_right_right_i?:boolean;

  constructor(public fauth:AngularFireAuth, public rout:ActivatedRoute,public fdb:AngularFirestore,public router:Router) {

    fauth.user.subscribe(user=>{
      if(!TreeViewComponent.bool)
      this.myid = user?.uid
     this.addDataToTree_i(user?.uid!);
    })
   
   }

   
   
  ngOnInit(): void {

    }

    addDataToTree(user:string) {
      this.myid = user;
      TreeViewComponent.bool = true;
      // this.rout.snapshot.params['parent'];
      this.router.navigate(['/redirect/'+user+'/redirect']);
    }

    public addDataToTree_i(user:string):void {
      console.log(user," ",this.myid)
      this.fauth.user.subscribe(user=>{
        this.myid = user?.uid
      })
      
      this.fdb.collection<User>('users').doc(user).valueChanges().subscribe(data=>{
      
          if( data?.isPremium == true ) {
              this.parent_i = true;
          } else this.parent_i = false;
          console.log(this.parent_i,data?.isPremium,user)
      })

     user =  this.rout.snapshot.params['parent']
      this.parent = this.rout.snapshot.params['parent']
      this.stack.push(user)
      this.fdb.collection('users').doc(user).collection('tree').doc('childs').valueChanges().subscribe(data=>{
        console.log(data!['left']);
        this.left = data!['left'];
        this.right = data!['right'];
        this.fdb.collection<User>('users').doc(this.left).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.left_=true
            if( data?.isPremium == true ) {
                this.left_i = true;
            } else this.left_i = false;
          }else this.left_ =false
        })

        this.fdb.collection<User>('users').doc(this.right).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.right_=true
            if( data?.isPremium == true ) {
              this.right_i = true;
          } else this.right_i = false;
          }else this.right_ = false
        })
        

      // left_left and left_right
      this.fdb.collection('users').doc(this.left).collection('tree').doc('childs').valueChanges().subscribe(data=>{
        console.log(data!['left']);
        this.left_left = data!['left'];
        this.left_right = data!['right'];


        this.fdb.collection<User>('users').doc(this.left_right).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.left_right_=true
            console.log('true')
          }else{
            this.left_right_=false
          }
          
        })
        this.fdb.collection<User>('users').doc(this.left_left).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.left_left_=true
            if( data?.isPremium == true ) {
              this.left_left_i = true;
          } else this.left_left_i = false;
            console.log('true')
          }else{
            this.left_left_=false
          }
          
        })

        this.fdb.collection('users').doc(this.left_left).collection('tree').doc('childs').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.left_left_left = data!['left'];
          this.left_left_right = data!['right'];

          this.fdb.collection<User>('users').doc(this.left_left_right).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.left_left_right_=true
              console.log('true')
              if( data?.isPremium == true ) {
                this.left_left_right_i = true;
            } else this.left_left_right_i = false;
            }else this.left_left_right_=false
            
          })
          this.fdb.collection<User>('users').doc(this.left_left_left).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.left_left_left_=true
              console.log('true')
              if( data?.isPremium == true ) {
                this.left_left_left_i = true;
            } else this.left_left_left_i = false;
            }else this.left_left_left_=false
          })
  
        });

        this.fdb.collection('users').doc(this.left_right).collection('tree').doc('childs').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.left_right_left = data!['left'];
          this.left_right_right = data!['right'];
  
        });


      });

      // right_left right_right
      this.fdb.collection('users').doc(this.right).collection('tree').doc('childs').valueChanges().subscribe(data=>{
        console.log(data!['left']);
        this.right_left = data!['left'];
        this.right_right = data!['right'];
        this.fdb.collection<User>('users').doc(this.right_right).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.right_right_=true
            console.log('true')
            if( data?.isPremium == true ) {
              this.right_right_i = true;
          } else this.right_right_i = false;
          }else this.right_right_ = false
          
        })
        this.fdb.collection<User>('users').doc(this.right_left).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.right_left_=true
            console.log('true')
            if( data?.isPremium == true ) {
              this.right_left_i = true;
          } else this.right_left_i = false;
          }else this.right_left_=false
          
        })
        this.fdb.collection('users').doc(this.right_left).collection('tree').doc('childs').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.right_left_left = data!['left'];
          this.right_left_right = data!['right'];

          this.fdb.collection<User>('users').doc(this.right_left_right).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.right_left_right_=true
              console.log('true')
              if( data?.isPremium == true ) {
                this.right_left_right_i = true;
            } else this.right_left_right_i = false;

            } else   this.right_left_right_=false
            
          })
          this.fdb.collection<User>('users').doc(this.right_left_left).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.right_left_left_=true
              console.log('true')
              if( data?.isPremium == true ) {
                this.right_left_left_i = true;
            } else this.right_left_left_i = false;
            }
            else this.right_left_left_=false
            
          })
  
        });

        this.fdb.collection('users').doc(this.right_right).collection('tree').doc('childs').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.right_right_left = data!['left'];
          this.right_right_right = data!['right'];
          this.fdb.collection<User>('users').doc(this.right_right_right).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.right_right_right_=true
              console.log('true')
              if( data?.isPremium == true ) {
                this.right_right_right_i = true;
            } else this.right_right_right_i = false;
            }
            else this.right_right_right_=false
            
          })
          this.fdb.collection<User>('users').doc(this.right_right_left).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.right_right_left_=true
              console.log('true')
              if( data?.isPremium == true ) {
                this.right_right_left_i = true;
            } else this.right_right_left_i = false;
            }
            else this.right_right_left_=false
            
          })
  
        });

      });


      });
    }



}
