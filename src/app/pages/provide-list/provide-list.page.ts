import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { UserService } from "../../shared/user.service";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { timeout } from 'rxjs/operators';
@Component({
  selector: "app-provide-list",
  templateUrl: "./provide-list.page.html",
  styleUrls: ["./provide-list.page.scss"],
})
export class ProvideListPage implements OnInit {
  activeTab: any = "Active";
  isjobpost: any;
  chosenProvider;
  allProviders;
  index;
  data: any = {
    provider: [
      {
        image: "assets/icon-image/tyler.svg",
        name: "Tyler Garrett",
        type: "All Type Ac Repair",
        rate: "4",
        review: "512",
        isAvail: "instant available",
        price: "6",
        label: "destacado",
        levelUp: true,
      },
      {
        image: "assets/icon-image/tom.svg",
        name: "Tom Wade",
        type: "Daikin Ac Repair",
        rate: "4",
        review: "508",
        isAvail: "instant available",
        price: "7",
        label: "destacado",
        levelUp: true,
      },
      {
        image: "assets/icon-image/anthony.svg",
        name: "Anthony Willis",
        type: "Hitachi AC Specialist",
        rate: "4",
        review: "502",
        isAvail: "instant available",
        price: "7",
        label: "destacado",
        levelUp: false,
      },
      {
        image: "assets/icon-image/jacob.svg",
        name: "Jacob Schneider",
        type: "All Type Ac Repair",
        rate: "4",
        review: "510",
        isAvail: "instant available",
        price: "7",
        label: "destacado",
        levelUp: true,
      },
      {
        image: "assets/icon-image/jordon.svg",
        name: "Richard Jordan",
        type: "Panasonic AC Repair",
        rate: "4",
        review: "512",
        isAvail: "instant available",
        price: "8",
        label: "destacado",
        levelUp: false,
      },
      {
        image: "assets/icon-image/alex.svg",
        name: "Alex Wood",
        type: "Daikin AC Repair",
        rate: "4",
        review: "512",
        isAvail: "instant available",
        price: "8",
        label: "destacado",
        levelUp: false,
      },
    ],
  };
  service;
  location;
  providers = [];
  closeProviders = false;
  noProviders = false;
  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private router: Router,
    private loading: LoadingController,
    private route: ActivatedRoute
  ) {
    if (localStorage.getItem("isjobpost") == "true") {
      this.isjobpost = true;
    } else {
      this.isjobpost = false;
    }
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.service = this.router.getCurrentNavigation().extras.state.service;
        this.location = this.router.getCurrentNavigation().extras.state.location;
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getProviders();
  }
  ioniViewWillLeave(){
    this.providers = [];
    this.closeProviders = false;
    this.noProviders = false;
  }

  slideOpts_2 = {
    slidesPerView: 3,
    autoplay: true,
    speed: 400,
    spaceBetween: 10,
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
    },
  };
  slideOpts_1 = {
    slidesPerView: 1,
    spaceBetween: 5,

    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
    },
  };

  provide_detail(item) {
    this.providers = [];

    let navagation: NavigationExtras = {
      state: {
        provider: item,
      },
    };

    this.navCtrl.navigateForward(["provider-detail"], navagation);
  }

  changeTab(name) {
    this.activeTab = name;
  }

  getProviders() {
    this.presentLoading();
    this.userService.getProviders().then((data) => {
      this.allProviders = data.data.map((provider) => provider.doc);
      const length = this.allProviders.length;
      const chosenIndex = Math.round(Math.random() * length);
      this.chosenProvider = this.allProviders[chosenIndex];
      for (const provider of this.allProviders) {
        const place = provider.address.address.split(",");
        // let line1 = place[0];
        // let line2 = place[1];
        let line3 = place[2].slice(1, 3);
        const verify = new RegExp(line3, "i");
        if (
          verify.test(this.location.address) &&
          this.service == provider.type
        ) {
          this.providers.push(provider);
        }
      }
      if(this.providers.length > 0){
        this.closeProviders = true;
      } else{
this.noProviders = true;
      }

      this.hideLoading();
    });
  }
  async presentLoading() {
    const loading = await this.loading.create({
      spinner: "bubbles",
    });
    await loading.present();
  }
  hideLoading() {
    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);
  }
}
