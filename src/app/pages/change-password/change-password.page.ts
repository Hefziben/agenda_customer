import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss']
})
export class ChangePasswordPage implements OnInit {
  user: any = {};
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  save() {
    this.navCtrl.back();
  }
}
