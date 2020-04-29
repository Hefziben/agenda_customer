import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-like-page',
  templateUrl: './like-page.page.html',
  styleUrls: ['./like-page.page.scss']
})
export class LikePagePage implements OnInit {
  activeTab: string = 'Active';
  data: any = {
    liked: [
      {
        name: 'Tyler Garrett',
        type: 'All Type AC Repair',
        image: 'assets/icon-image/tyler.svg',
        rate: '4',
        review: '512'
      },
      {
        name: 'Tom Wade',
        image: 'assets/icon-image/tom.svg',
        type: 'Daikin AC Repair',
        rate: '4',
        review: '508'
      },
      {
        name: 'Anthony Willis',
        image: 'assets/icon-image/anthony.svg',
        type: 'Hitachi AC Specialist',
        rate: '4',
        review: '502'
      },
      {
        name: 'Jacob Schneider',
        image: 'assets/icon-image/jacob.svg',
        type: 'All AC Specialist',
        rate: '4',
        review: '510'
      },
      {
        name: 'Richard Jordan',
        image: 'assets/icon-image/jordon.svg',
        type: 'Panasonic AC Repair',
        rate: '4',
        review: '512'
      },
      {
        name: 'Alex Wood',
        image: 'assets/icon-image/alex.svg',
        type: 'Daikin AC Repair',
        rate: '4',
        review: '512'
      }
    ]
  };
  constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activeTab = params['id'];
    });
  }
  chageTab(name) {
    this.activeTab = name;
  }

  provide_detail() {
    this.navCtrl.navigateForward('/provider-detail');
  }
}
