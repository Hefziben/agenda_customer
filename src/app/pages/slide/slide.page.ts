import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss']
})
export class SlidePage implements OnInit {
  constructor(private navCtrl: NavController, private menu: MenuController) {
    this.menu.enable(false);
  }

  ngOnInit() {}
  home() {
    this.navCtrl.navigateForward('tabs/home');
  }
}
