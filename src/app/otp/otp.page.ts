import { Component, OnInit } from "@angular/core";
import { NavController, MenuController, AlertController, LoadingController } from "@ionic/angular";
import { NavigationExtras, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserService } from "../shared/user.service";

import * as firebase from "firebase";
import { async } from '@angular/core/testing';

@Component({
  selector: "app-otp",
  templateUrl: "./otp.page.html",
  styleUrls: ["./otp.page.scss"],
})
export class OtpPage implements OnInit {
  username: string = "";
  password: string = "";

  otpSent: boolean = false;
  phoneNumber = null;
  otp = null;
  recaptchaVerifier;
  showPassword: any = false;
  signupForm: FormGroup;
  confirmationResult;
  constructor(
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public userService: UserService,
    private navCtrl: NavController,
    private menu: MenuController,
    private fb: FormBuilder,
    private storage: Storage,
    private router: Router,
    private alerta:AlertController,
    private loading:LoadingController
  ) {
    this.menu.enable(false);
    this.signupForm = this.fb.group({
      number: [""],
      name: [""],
      emaiil: [""],
    });
  }

  ngOnInit() {
    this.storage.get("user").then((data) => {
      this.userService.pingServer().then((data) => {
      });
    });
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      }
    );
  }

  login() {
    this.navCtrl.back();
  }

  gotoHome() {
    this.navCtrl.navigateForward("tabs/home");
  }

  sendOtp() {
    this.presentLoading();
    firebase
      .auth()
      .signInWithPhoneNumber("+" + this.phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.confirmationResult = confirmationResult;
        var credential = confirmationResult.verificationId;
       this.dismissLoading();
      })
      .catch((err) => {
        this.dismissLoading();
      });
  }

  otpChange() {
    const data = {
      user: this.phoneNumber,
    };
    this.presentLoading();
      this.userService.verifyUser(data).then((res) => {
        if (res.data == "user does exist") {
          this.dismissLoading();
          const msj = "ya existe un usuario registrado con es numero de telefono, por favor verifica y vuelve a intentar."

          this.presentAlert(msj)
        } else {
          this.otpSent = true;
          this.sendOtp();
          this.dismissLoading();
        }
      });

    

  }
  signIn() {
    this.presentLoading();
    this.confirmationResult.confirm(this.otp).then((res) => {
      const user = {
        user: this.phoneNumber,
        uid: res.user.uid,
        name: "",
        password: "",
        address:[]
      };
      this.userService.newUser(user).then((data) => {
        const message = data.data;
          let navigationExtras: NavigationExtras = {
            state: {
              user: user,
            },
          };
          this.dismissLoading();
          this.router.navigate(["signup"], navigationExtras);
        
      });
    });
  }

  async presentAlert(msj) {
    const alert = await this.alerta.create({
      header: 'Alerta',
      message: msj,
      buttons: ['OK']
    });
  
    await alert.present();
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
