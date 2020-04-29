import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app'
import { UserService } from "../../shared/user.service";
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
public disable:boolean = true;
  otpSent: boolean = false;
phoneNumber = null;
otp = null;
recaptchaVerifier
showPassword: any = false;
signupForm : FormGroup;
public newUser;


confirmationResult;
  constructor(
    public afAuth: AngularFireAuth,
    public user: UserService,
		public afstore: AngularFirestore,
    private navCtrl: NavController, 
    private menu: MenuController, 
    private fb: FormBuilder,
    public route:ActivatedRoute,
    private router:Router,
    private loading:LoadingController,
    private storage: Storage) {

      this.route.queryParams.subscribe((params) => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.newUser = this.router.getCurrentNavigation().extras.state.user;
        } else {
          this.router.navigate(["tabs/home"]);
          
        }
      });
    // this.menu.enable(false);
    this.signupForm = this.fb.group({
       name:[""],
       passcode:[""],
       repasscode:[""]
    })
  }

  ngOnInit() {
   
  }

  login() {
    this.navCtrl.back();
  }

  gotoHome() {
    //this.navCtrl.navigateForward('tabs/home');
  }

  verifCode(event){
if(this.signupForm.value.passcode !== this.signupForm.value.repasscode ){
} if(this.signupForm.value.passcode == this.signupForm.value.repasscode && this.signupForm.value.passcode !== ""){
  this.disable = false;   
}

  }

    signIn() {
      this.presentLoading();   
      this.newUser.name = this.signupForm.value.name;
      this.newUser.password = this.signupForm.value.passcode;
      this.user.newUser(this.newUser).then(data =>{
        this.storage.set('user', this.newUser).then(data =>{
          this.dismissLoading();
          let navigate:NavigationExtras = {
            state:{
              user:this.newUser
            }
          }
          this.router.navigate(['address'], navigate)
        })
        
      })


      // this.confirmationResult.confirm(this.otp).then(user=>{
      // })
      }

      async presentLoading() {
        const loading = await this.loading.create({
          duration: 2000,
          spinner: 'bubbles'
        });
        await loading.present();
      }
      
    dismissLoading(){
       this.loading.dismiss();
    }

}
