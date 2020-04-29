import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from "../../shared/user.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  showPassword: any = false;
  loginForm:FormGroup;

  constructor(
    private loading:LoadingController,
    private storage: Storage, private navCtrl: NavController, private menu: MenuController, private fb:FormBuilder, private userService:UserService) {
    this.menu.enable(false);
    this.loginForm = this.fb.group({
      user:[''],
      password:['']
    })
  }

  ngOnInit() {
    this.userService.pingServer().then( data =>{
    })
  }

  signup() {
    this.navCtrl.navigateForward('/otp');
  }

  sign_in() {
    this.presentLoading();   
   const user = {user:this.loginForm.value.user};
    this.userService.getUser(user).then(data =>{
      const user = data.data;
      if(this.loginForm.value.password == user.password){
      this.storage.set('user',user);
      this.hideLoading();
     localStorage.setItem('isLogin', 'true');
    this.navCtrl.navigateForward('tabs/home');

      } else{
        this.hideLoading();
      }
      
      
    });

  }

  forgotPassword() {
    this.navCtrl.navigateForward('/forgot');
  }

  gotoHome() {
    this.navCtrl.navigateRoot('/tabs/home');
  }
  async presentLoading() {
    const loading = await this.loading.create({
       spinner: 'bubbles'
    });
    await loading.present();
  }
  hideLoading(){
    this.loading.dismiss();
  }
}
