import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from "../../shared/user.service";

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.page.html',
  styleUrls: ['./provider-detail.page.scss']
})
export class ProviderDetailPage implements OnInit {
  provider;
  state: any = 1;
  isjobpost: any;
  data: any = {
    photos: [
      'assets/icon-image/ac-service.svg',
      'assets/icon-image/ac-repair.svg',
      'assets/icon-image/ac-work.svg',
      'assets/icon-image/ac-img.svg'
    ],
    review: [
      {
        name: 'Carol Hudson',
        image: 'assets/icon-image/alex.svg',
        ago: '1 Hour ago',
        detail:
          'Phasellus risus turpis, pretium sit amet magna non, molestie ultricies enim. Nullam pulvinar felis at metus',
        rate: '4',
        status: 'aa'
      },
      {
        name: 'Harry Wagner',
        image: 'assets/icon-image/alex.svg',
        ago: '2 Hour ago',
        detail:
          'Phasellus risus turpis, pretium sit amet magna non, molestie ultricies enim. Nullam pulvinar felis at metus',
        rate: '4'
      }
    ]
  };
jobs = {
  active: 0,
  done:0,
  cancelled:0
}
  constructor(private api:UserService, private navCtrl: NavController, private route:ActivatedRoute, private router:Router, private loading: LoadingController) {
    if (localStorage.getItem('isjobpost') == 'true') {
      this.isjobpost = true;
    } else {
      this.isjobpost = false;
    }
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.provider = this.router.getCurrentNavigation().extras.state.provider;
        this.api.getJobs().then( res =>{
          const jobs = res.data.map( (data) => data.doc);
          for (const job of jobs) {
            if(job.proveedor.usereId == this.provider.usereId){
              if(job.estado.name == "Agendado" || job.estado.name == "Aprovado" || job.estado.name == "Terminado"){
                this.jobs.active++
              }
              if(job.estado.name == "Pagado"){
                this.jobs.done++
              }
              if(job.estado.name == "Cancelado"){
                this.jobs.cancelled++
              }
            }
          }
        });
               
               
      } else {
        this.router.navigate(["tabs/home"]);
        
      }
    });
  }

  ngOnInit() {
    
  }
  


  logScrolling(ev) {
    if (ev.detail.scrollTop >= 200) {
      this.state = 2;
    } else {
      this.state = 1;
    }
  }
  changeRange(e) {}

  servie_detail(service) {
    let navagation: NavigationExtras = {
      state:{
        provider:this.provider,
        service:service
      }
    }
    
    this.router.navigate(["service-detail"], navagation);
  }
  booking() {
    this.navCtrl.navigateForward('tabs/booking');
  }

  async presentLoading() {
    const loading = await this.loading.create({
       duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  hideLoaing(){
    this.loading.dismiss();
  }
}
