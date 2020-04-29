import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { UserService } from "../../shared/user.service";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.page.html",
  styleUrls: ["./setting.page.scss"],
})
export class SettingPage implements OnInit {
  myValue: Boolean;
  user;
  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private userService: UserService,
    private afMessaging: AngularFireMessaging,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.storage.get("user").then((data) => {
      this.user = data;
      if (!this.user.msgToken || this.user.msgToken == "empty") {
        this.myValue = false;
      } else {
        this.myValue = true;
      }
    });
  }
  changePassword() {
    this.navCtrl.navigateForward("change-password");
  }
  SignOut() {
    localStorage.clear();
    this.storage.remove("user");
    this.navCtrl.navigateRoot(["login"]);
  }

  myChange(e) {
    const value = e.detail.checked;
    if (value == true) {
      this.requestPushNotificationsPermission();
    } else {
      this.presentLoading();
      this.user.msgToken = "empty";
      this.userService.updateUser(this.user).then((res) => {
        this.storage.set("user", this.user);
        this.hideLoader();
      });
    }
  }

  requestPushNotificationsPermission() {
    // requesting permission
    this.presentLoading();
    this.afMessaging.requestToken // getting tokens
      .subscribe(
        (token) => {
          // USER-REQUESTED-TOKEN
          this.user.msgToken = token;
          this.userService.updateUser(this.user).then((res) => {
            this.storage.set("user", this.user);
            this.hideLoader();
          });
        },
        (error) => {
          console.error(error);
          this.hideLoader();
        }
      );
  }

  async presentLoading() {
    const loading = await this.loading.create({
      spinner: "bubbles",
    });
    await loading.present();
  }
  hideLoader() {
    this.loading.dismiss();
  }
}
