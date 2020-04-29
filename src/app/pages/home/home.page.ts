import { Component, OnInit, Input } from '@angular/core';
import { AlertController, NavController, MenuController, LoadingController } from '@ionic/angular';
import {UserService } from "../../shared/user.service";
import { Router,NavigationExtras } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  selectedLocation = 'Goldport';
  data: any = {
    services: [
      {
        image: 'assets/icon-image/beaut_img.svg',
        name: 'Salon de Belleza & Spa',
        label: 'Trending'
      },
      {
        image: 'assets/icon-image/repair_icon.svg',
        name: 'Electrodomesticos'
      },
      {
        image: 'assets/icon-image/travel.svg',
        name: 'Viajes'
      },
      {
        image: 'assets/icon-image/repair_icon.svg',
        name: 'Bodas & Eventos'
      },
      {
        image: 'assets/icon-image/Cockroach.svg',
        name: 'Control de plagas'
      },
      {
        image: 'assets/icon-image/cityscape.svg',
        name: 'Bienes Raíces',
        label: 'Trending'
      },
      {
        image: 'assets/icon-image/service-img.svg',
        name: 'Servicios de Negocios'
      },
      {
        image: 'assets/icon-image/hobbies.svg',
        name: 'Pasatiempos',
        label: 'Trending'
      },
      {
        image: 'assets/icon-image/health.svg',
        name: 'Salud'
      },
      {
        image: 'assets/icon-image/job-icon.svg',
        name: 'Empleos'
      },
      {
        image: 'assets/icon-image/rent-car.svg',
        name: 'Alquiler'
      },
      {
        image: 'assets/icon-image/more-icon.svg',
        name: 'Computadoras & Laptops',
      },
      {
        image: 'assets/icon-image/more-icon.svg',
        name: 'Vehículos',
      },
      {
        image: 'assets/icon-image/more-icon.svg',
        name: 'Motocicletas ',
      }
    ]
  };
public categories = [];
public user;
public categoria;
  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private menu: MenuController,
    private service:UserService,
    private router:Router,
    private storage:Storage,
    private afMessaging: AngularFireMessaging,
    private loading:LoadingController,
    private userService:UserService
  ) {
    this.menu.enable(true);
  }

 
  detail() {
    
    let navagation: NavigationExtras = {
      state:{
        service:this.categoria.name,
        location:this.selectedLocation
      }
    }    
    this.router.navigate(['provide-list'], navagation)
  }
ngOnInit(){
 
}
ionViewWillLeave(){
  this.categories = [];
  console.log('left');
  
}
ionViewWillEnter(){
  this.presentLoading();
  this.storage.get('user').then(res =>{
    if(res){
      this.user = res;
      
      if(!this.user.msgToken){
        this.hideLoader();
        this.notifcationAlert();
      }

      
    }
  })

  this.service.getCategories().then(data=>{    
    const response = data.data;
    const all = response.map((cats) => cats.doc );
    for (const cat of all) {
      if(cat.tag == 'popular'){
        this.categories.unshift(cat);
      } else{
        this.categories.push(cat);
      }
    }
    this.hideLoader();
    
  });
  

}

requestPushNotificationsPermission() { // requesting permission
  this.presentLoading();
  this.afMessaging.requestToken // getting tokens
    .subscribe(
      (token) => { // USER-REQUESTED-TOKEN
        this.user.msgToken = token;
        this.userService.updateUser(this.user).then(res=>{
          this.storage.set('user', this.user);            
        this.hideLoader();
          
        })
      },
      (error) => {
        console.error(error);
        this.hideLoader();
      }
    );
}
async presentLoading() {
  const loading = await this.loading.create({
    spinner: 'bubbles'
  });
  await loading.present();
}
hideLoader(){
  this.loading.dismiss();
}
async notifcationAlert() {
  const alert = await this.alertController.create({
    cssClass:'notication',
    header: 'Noticaciones',
    message: 'Permitir notificaciones en la aplicación.',
    buttons: [
      {
        text: "No",
        role: "cancel",
        cssClass: "secondary",
        handler: () => {
          this.user.msgToken = 'empty';
          this.storage.set('user', this.user).then(result =>{
          });
        },
      },
      {
        text: "OK",
        handler: () => {
         this.requestPushNotificationsPermission(); 
        },
      },
    ]
  });

  await alert.present();
}

async locationRadio(cat){
  this.categoria = cat;
  let radio_options = [];
  for (const item of this.user.address) {
    radio_options.push({
      type:'radio',
      label:item.address,
      value:item.address,
      checked:false
    });
    
  }
  let alert = await this.alertController.create({
    header: "Escoger dirección",
    cssClass:'radioG',
    inputs: radio_options,
    buttons: [
      {
        text: "Cancelar",
        role: "cancel",
        cssClass: "secondary",
        handler: () => {},
      },
      {
        text: "Otra",
        handler: () => {
          this.router.navigate(["address"]);
        },
      },
      {
        text: "Ok",
        handler: (data) => {
          data;
          for (const location of this.user.address) {
            if (location.address == data) {
              this.selectedLocation = location;
              this.detail();
              
            }
          }
        },
      },
    ],
  });
await alert.present();

}

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Escoger Dirección',
      inputs: [
        {
          name: 'Kirakwall',
          type: 'radio',
          label: 'Kirakwall',
          value: 'Kirakwall',
          checked: true
        },
        {
          name: 'Kirakwall2',
          type: 'radio',
          label: 'Kirakwall2',
          value: 'Kirakwall2'
        },
        {
          name: 'Kirakwall3',
          type: 'radio',
          label: 'Kirakwall3',
          value: 'Kirakwall3'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: data => {
            this.selectedLocation = data;
          }
        }
      ]
    });

    await alert.present();
  }

  slideOpts_2 = {
    slidesPerView: 3,
    autoplay: true,
    spaceBetween: 10,
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 5
      }
    }
  };
}
