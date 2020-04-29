import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-post-status',
  templateUrl: './post-status.page.html',
  styleUrls: ['./post-status.page.scss']
})
export class PostStatusPage implements OnInit {
  activeTab: string = 'Active';
  cancel: any = false;
  data: any = {
    current: [
      {
        type: 'AC REPAIR',
        image: 'assets/image/harry.png',
        name: 'Harry Garrett',
        date: '14/10/2019',
        detail:
          'It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
        rdate: '15/10/2019',
        time: '10:15 PM',
        id: '25687',
        payment: 'Online',
        status: 'Post Request',
        btn_div: 'yes'
      },
      {
        type: 'CAR REPAIR',
        image: 'assets/image/chris.png',
        name: 'Dennis Woodkin',
        date: '14/10/2019',
        detail:
          'It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
        rdate: '15/10/2019',
        time: '10:15 PM',
        id: '25687',
        payment: 'Online',
        status: 'Post Request'
      }
    ],
    cancel: {
      type: 'AC REPAIR',
      image: 'assets/image/tyler.png',
      name: 'Tyler Garrett',
      date: '14/10/2019',
      detail:
        'It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
      rdate: '15/10/2019',
      time: '10:15 PM',
      id: '25687',
      payment: 'Online',
      status: 'Post Request'
    },
    finished: [
      {
        type: 'AC REPAIR',
        image: 'assets/image/randy.png',
        name: 'Randy Mendoza',
        date: '14/10/2019',
        detail:
          'It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
        rdate: '15/10/2019',
        time: '10:15 PM',
        id: '25687',
        payment: 'Online',
        status: 'workdone'
      },
      {
        type: 'CAR REPAIR',
        image: 'assets/image/hawkins.png',
        name: 'Anthony Hawkins',
        date: '14/10/2019',
        detail:
          'It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
        rdate: '15/10/2019',
        time: '10:15 PM',
        id: '25687',
        payment: 'Online',
        status: 'Post Request'
      }
    ]
  };

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  chageTab(name) {
    this.activeTab = name;
  }
  serviceProvider() {
    this.navCtrl.navigateForward(['provide-list']);
  }
}
