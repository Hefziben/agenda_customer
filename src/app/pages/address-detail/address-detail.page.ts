import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ToastController, NavController, LoadingController,  } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from "../../shared/user.service";
import { Storage } from "@ionic/storage";


@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.page.html',
  styleUrls: ['./address-detail.page.scss'],
})
export class AddressDetailPage implements OnInit {

  lat: number;
  lan: number;
  user;
  address: string;
  addressForm:FormGroup;
  submitted = false;

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public router:Router,
    public route:ActivatedRoute,
    public fb:FormBuilder,
    public navCntrl:NavController,
    public userService:UserService,
    public storage:Storage,
    public loading:LoadingController

  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lat = this.router.getCurrentNavigation().extras.state.lat;
        this.lan = this.router.getCurrentNavigation().extras.state.lan;
        this.user = this.router.getCurrentNavigation().extras.state.user;
               
      } else {
        this.router.navigate(["tabs/home"]);
        
      }
    });

    this.addressForm = fb.group({
      address:[''],
      addressDetail:[''],
      tag:['']
    })
  }


  ngOnInit() {
  }
ionViewDidEnter(){
  this.getAddress(this.lat, this.lan).subscribe((decodedAddress) => {
    this.address = decodedAddress;
  });
  
}
  private getAddress(lat: number, lan: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&key=${environment.googleMapsAPIKey}`
      )
      .pipe(
        map((geoData) => {
          if (!geoData || !geoData.results || geoData.results === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  //function to save address
  saveAddress(){

    this.submitted = true;
    if(!this.addressForm.value.addressDetail){
      return
    }
    else{
      this.presentLoading();
      const address = {
        lat:this.lat,
        lan:this.lan,
        address:this.addressForm.value.address,
        detail:this.addressForm.value.addressDetail,
        tag:this.addressForm.value.tag
      };
      this.user.address.push(address);
      this.userService.newUser(this.user).then(data=>{
        this.storage.set('user',this.user).then(res=>{
          this.dismissLoading();
          this.router.navigate(['tabs/home'])
        })

        
      })

      
    }
  }
  goBack(){
    this.navCntrl.navigateBack('address')
  }
  // function to display the toast with location and dismiss button

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.address,

      position: "middle",
      buttons: [
        {
          icon: "close-circle",
          role: "cancel",
        },
      ],
    });
    toast.present();
  }

  // click function to display a toast message with the address

  onMarkerClick() {
    this.presentToast();
  }
  async presentLoading() {
    const loading = await this.loading.create({
      spinner: 'bubbles'
    });
    await loading.present();
  }
async dismissLoading(){
  await this.loading.dismiss();
}
}
