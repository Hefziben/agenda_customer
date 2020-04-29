import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
declare let $;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage implements OnInit {
  showReview: any = true;
  rate: any = 1;
  success: any = false;
  data: any = {
    type: 'AC REPAIR',
    image: 'assets/icon-image/randy.svg',
    name: 'Randy Mendoza',
    date: '14/10/2019',
    detail:
      'AC Repair with full service Ac reader will be distracted by the readable content of a page when looking at its layout',
    rdate: '15/10/2019',
    Stime: '10:15 PM',
    Etime: '12:15',
    id: '25687',
    payment: 'Online',
    fare: '$6/hour',
    pay: '12',
    totalTime: '2',
    status: 'Payment'
  };
  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    $(document).ready(() => {
      $('#card-no').on('keypress change', function() {
        $(this).val((index, value) => {
          return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1  ');
        });
      });

      $('#exp-date').keyup(function(e) {
        const val = $(this).val();
        if (!isNaN(val)) {
          let tempVal: any;
          if (val > 1 && val < 10 && val.length == 1) {
            tempVal = '0' + val + '/';
            $(this).val(tempVal);
          } else if (
            val >= 1 &&
            val < 10 &&
            val.length == 2 &&
            e.keyCode != 8
          ) {
            tempVal = val + '/';
            $(this).val(tempVal);
          } else if (val > 9 && val.length == 2 && e.keyCode != 8) {
            if (val > 12) {
              tempVal = '0' + val[0] + '/' + val[1];
              $(this).val(tempVal);
            } else {
              tempVal = val + '/';
              $(this).val(tempVal);
            }
          }
        }
      });
    });
  }

  setting() {
    if (localStorage.getItem('isjobpost') == 'true') {
      localStorage.setItem('isjobpost', 'false');
      this.navCtrl.navigateRoot('tabs/home');
    } else {
      this.navCtrl.navigateForward('tabs/setting');
    }
  }
}
