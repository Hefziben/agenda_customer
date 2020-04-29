import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss']
})
export class HistoryPage implements OnInit {
  activeTab: string = 'Active';
  data: any = {
    finised: [
      {
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
      },
      {
        type: 'CAR REPAIR',
        image: 'assets/icon-image/dennis.svg',
        name: 'Dennis Valdez',
        date: '12/10/2019',
        detail:
          'Car Repair with full service fact that a reader will be distracted by the readable content of a page when at its',
        rdate: '13/10/2019',
        Stime: '11:00 PM',
        Etime: '01:00',
        id: '25687',
        payment: 'Online',
        fare: '$6/hour',
        pay: '12',
        totalTime: '2',
        status: 'Payment'
      }
    ],
    current: [
      {
        type: 'AC REPAIR',
        image: 'assets/icon-image/tyler.svg',
        name: 'Tyler Garrett',
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
        status: 'Post Requeast'
      },
      {
        type: 'AC REPAIR',
        image: 'assets/icon-image/chris.svg',
        name: 'Chris Barrett',
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
        status: 'Post Requeast'
      }
    ]
  };

  constructor() {}

  ngOnInit() {}

  changeTab(name) {
    this.activeTab = name;
  }
}
