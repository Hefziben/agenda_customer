import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.page.html',
  styleUrls: ['./service-list.page.scss']
})
export class ServiceListPage implements OnInit {
  data: any = {
    best: [
      {
        image: 'assets/icon-image/air-conditioner.svg',
        name: 'AC'
      },
      {
        image: 'assets/icon-image/car_icon.svg',
        name: 'Car'
      },
      {
        image: 'assets/icon-image/computer.svg',
        name: 'Computer'
      },
      {
        image: 'assets/icon-image/laptop.svg',
        name: 'Laptop'
      },
      {
        image: 'assets/icon-image/mobile.svg',
        name: 'Mobile Phone'
      },
      {
        image: 'assets/icon-image/motorcycle.svg',
        name: 'Motorcycle'
      },
      {
        image: 'assets/icon-image/freez.svg',
        name: 'Refrigerator'
      },
      {
        image: 'assets/icon-image/washing-machine.svg',
        name: 'Washing Machine'
      },
      {
        image: 'assets/icon-image/water-filter.svg',
        name: 'Water Purifier'
      }
    ],
    explore: [
      {
        image: 'assets/icon-image/air-conditioner.svg',
        name: 'AC'
      },
      {
        image: 'assets/icon-image/cooler.svg',
        name: 'Air Cooler'
      },
      {
        image: 'assets/icon-image/Camera.svg',
        name: 'Camera'
      },
      {
        image: 'assets/icon-image/car_icon.svg',
        name: 'Car'
      },
      {
        image: 'assets/icon-image/car_ac.svg',
        name: 'Car AC'
      },
      {
        image: 'assets/icon-image/computer.svg',
        name: 'Computer'
      },
      {
        image: 'assets/icon-image/printer.svg',
        name: 'Computer Printer'
      }
    ]
  };

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  provider() {
    if (localStorage.getItem('isjobpost') == 'true') {
      this.navCtrl.navigateForward(['provide-list']);
    } else {
      this.navCtrl.navigateForward(['tabs/provide-list']);
    }
  }
}
