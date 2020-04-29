import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
declare var $;
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private navCtrl: NavController, private keyboard: Keyboard) {
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      $('#add_fabBtn').hide();
    });
    this.keyboard.onKeyboardWillHide().subscribe(() => {
      $('#add_fabBtn').show();
    });
  }

  jobpost() {
    this.navCtrl.navigateForward(['tabs/booking']);
  }
}
