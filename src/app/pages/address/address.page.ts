import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ToastController } from "@ionic/angular";
import { Router, NavigationExtras, ActivatedRoute, } from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
  selector: "app-address",
  templateUrl: "./address.page.html",
  styleUrls: ["./address.page.scss"],
})
export class AddressPage implements OnInit {
  lat: number;
  lng: number;
  address: string;
  user;
  locations = [
    {
      name: "Appleton",
      lat: 44.261336,
      lan: -88.4153847,
    },
    {
      name: "Menacha",
      lat:  44.202511,
      lan: -88.446499,
     
    },
    {
      name: "Neenah",
      lat: 44.186041,
      lan: -88.462457,
    },
    {
      name: "Kimberly",
      lat: 44.271676,
      lan: -88.340094,
    },
    {
      name: "Kaukauna",
      lat: 44.278040,
      lan:  -88.272081
    },
    {
      name: "Little chute",
      lat: 44.280299,
      lan: -88.318579,
    },
    {
      name: "Oshkosh",
      lat: 44.020620, 
      lan: -88.540236
    },
    {
      name: "De Pere",
      lat: 44.448671,
      lan:  -88.060274
    },
    {
      name: "Green Bay",
      lat: 44.512590, 
      lan: -88.012976,
    },
    {
      name: "Fond Du Lac",
      lat: 43.755959,
      lan:  -88.448503,
    },
    {
      name: "Sheboygan",
      lat: 43.748523, 
      lan:  -87.941414
    },
    {
      name:'Manitowoc',
      lat:44.099619, 
      lan:-87.825231
    },    {
      name:'Wautoma',
      lat:44.074550, 
      lan:-89.288090
    }
    
  ];

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public router: Router,
    public route:ActivatedRoute,
    public storage:Storage

  ) {
    
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
      } else {
        this.storage.get('user').then(data =>{
          if(data){
            this.user = data;
          } else{
            this.router.navigate(["tabs/home"]);
          }
        })

        
      }
    });
  }

  ngOnInit() {
    // call get current location function on initializing
  }

  choose(location) {
    this.lat = location.lat;
    this.lng = location.lan;
    this.detailPage();
  }

  getCurrentLocation() {
    Plugins.Geolocation.getCurrentPosition().then((result) => {
      this.lat = result.coords.latitude;
      this.lng = result.coords.longitude;

      // calling getAddress function to decode the address
      this.detailPage();
    });
  }

  // function to navegate to details page with params
  detailPage() {
    let navigation: NavigationExtras = {
      state: {
        user:this.user,
        lat: this.lat,
        lan: this.lng,
      },
    };
    this.router.navigate(["address-detail"], navigation);
  }
}
