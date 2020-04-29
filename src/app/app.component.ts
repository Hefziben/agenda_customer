import { Component, ViewChildren, QueryList } from '@angular/core';

import {
  Platform,
  NavController,
  ToastController,
  IonRouterOutlet
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { menuController } from '@ionic/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    // {
    //   title: 'Agenda',
    //   url: '/tabs/booking',
    //   icon: 'assets/icon-image/booking-menu.svg'
    // },
    {
      title: 'Notificaciones',
      url: '/tabs/notification',
      icon: 'assets/icon-image/notification-menu.svg'
    },
    // {
    //   title: 'Historial',
    //   url: '/history',
    //   icon: 'assets/icon-image/history-menu.svg'
    // },
    // {
    //   title: 'Favorito',
    //   url: '/like-page/Active',
    //   icon: 'assets/icon-image/like-menu.svg'
    // },
    // {
    //   title: 'Bloqueados',
    //   url: '/like-page/Completed',
    //   icon: 'assets/icon-image/block-menu.svg'
    // },
    // {
    //   title: 'Servicios',
    //   url: '/tabs/service-list',
    //   icon: 'assets/icon-image/booking-menu.svg'
    // },
    // {
    //   title: 'Proveedores',
    //   url: '/tabs/provide-list',
    //   icon: 'assets/icon-image/booking-menu.svg'
    // },
    // {
    //   title: 'Provider Detail',
    //   url: 'provider-detail',
    //   icon: 'assets/icon-image/booking-menu.svg'
    // },
    // {
    //   title: 'Servicios detallados',
    //   url: 'service-detail',
    //   icon: 'assets/icon-image/booking-menu.svg'
    // },
    // {
    //   title: 'Pagos',
    //   url: 'payment',
    //   icon: 'assets/icon-image/booking-menu.svg'
    // }
  ];
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  public user;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private router: Router,
    private toastController: ToastController,
    private storage:Storage
  ) {
    this.initializeApp();
  }

   initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      setTimeout(() => {
        this.splashScreen.hide();
        this.storage.get('user').then(data =>{
          if(data){
            this.user = data;                   
        this.navCtrl.navigateRoot('tabs/home');
          } else{            
        this.navCtrl.navigateRoot('tabs/login');
          }
        })
        
      }, 1000);
    });
    this.backButtonEvent();
    if (!localStorage.getItem('isLogin')) {
      localStorage.setItem('isLogin', 'false');
    }
    if (!localStorage.getItem('isjobpost')) {
      localStorage.setItem('isjobpost', 'false');
    }
  }
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (
          this.router.url === '/tabs/home' ||
          this.router.url === '/tabs/booking' ||
          this.router.url === '/tabs/notification' ||
          this.router.url === '/tabs/setting' ||
          this.router.url === '/tabs/service-list' ||
          this.router.url === '/tabs/profile' ||
          this.router.url === '/history' ||
          this.router.url === '/like-page' ||
          this.router.url === '/login' ||
          this.router.url === '/signup'
        ) {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator['app'].exitApp();
          } else {
            this.showToast();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'press back again to exit App.',
      duration: 2000
    });
    toast.present();
  }
  setting() {
    menuController.close();
    this.navCtrl.navigateForward(['tabs/setting']);
  }

  SignOut() {
    menuController.close();
    localStorage.clear();
    this.storage.remove('user')
    this.navCtrl.navigateRoot(['login']);
  }

  closeMenu() {
    menuController.close();
  }
}
