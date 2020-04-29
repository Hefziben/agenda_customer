import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {  Storage} from "@ionic/storage";
import { UserService } from "../../shared/user.service";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.page.html",
  styleUrls: ["./booking.page.scss"],
})
export class BookingPage implements OnInit {
  activeTab: string = "Active";
  data: any = {
    current: [
      {
        type: "AC REPAIR",
        image: "assets/icon-image/tyler.svg",
        name: "Tyler Garrett",
        date: "14/10/2019",
        detail:
          "It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        rdate: "15/10/2019",
        time: "10:15 PM",
        id: "25687",
        payment: "Online",
        status: "Post Request",
      },
      {
        type: "CAR REPAIR",
        image: "assets/icon-image/chris.svg",
        name: "Chris Barrett",
        date: "14/10/2019",
        detail:
          "It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        rdate: "15/10/2019",
        time: "10:15 PM",
        id: "25687",
        payment: "Online",
        status: "Post Request",
      },
    ],
    cancel: {
      type: "AC REPAIR",
      image: "assets/icon-image/tyler.svg",
      name: "Tyler Garrett",
      date: "14/10/2019",
      detail:
        "It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      rdate: "15/10/2019",
      time: "10:15 PM",
      id: "25687",
      payment: "Online",
      status: "Post Request",
    },
    finished: [
      {
        type: "AC REPAIR",
        image: "assets/icon-image/randy.svg",
        name: "Randy Mendoza",
        date: "14/10/2019",
        detail:
          "It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        rdate: "15/10/2019",
        time: "10:15 PM",
        id: "25687",
        payment: "Online",
        status: "workdone",
      },
      {
        type: "CAR REPAIR",
        image: "assets/icon-image/hawkins.svg",
        name: "Anthony Hawkins",
        date: "14/10/2019",
        detail:
          "It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        rdate: "15/10/2019",
        time: "10:15 PM",
        id: "25687",
        payment: "Online",
        status: "Post Request",
      },
    ],
  };
  trabajos = [];
  user;
  pendingAppoval;
  approved;
  cancelJob = false;
  cancelComment;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.start();
  }

  ionViewWillLeave(){
this.cancelJob = false;    
    this.trabajos = [];
    
  }

  start(){
    this.storage.get("user").then((res) => {
      if (res) {
        this.user = res;
        const userId = this.user.user;   
        this.userService.getJobs().then((data) => {
          const allJobs = data.data.map((trabajo) => trabajo.doc);
          console.log(allJobs);
          
          for (const job of allJobs) {
            this.approved = "md-step active editable";
            
            if (job.cliente.user == userId && allJobs.length !== this.trabajos.length) {
              this.trabajos.unshift(job);
            }
            
            
          }
        });
      }
    });
  }

  chageTab(name) {
    this.activeTab = name;
  }

  cancel(){
    this.cancelJob = true;
  }
  comment(e){
    this.cancelComment = e.detail.value;
  }
  cancelbtn() {
    this.activeTab = "Cancel";
  }
  processCancelation(job){
job.estado.name = 'Cancelado';
job.estado.comment = this.cancelComment
this.userService.newJob(job).then(res =>{
  this.createMsj(job);
  
})
  }

  createMsj(job){
    const msgData = {
      token:job.proveedor.msgToken,
      name: this.user.name,
      image:this.user.image,
      user:this.user.user,
      title:`Servicio ${job.estado.name}`,
      body:job.estado.comment,          
    }
    this.userService.newMsj(msgData).then(success =>{
      this.userService.sendMsj(msgData).then(result =>{
      })
  
                
    })
  }

  paymentbtn() {
    this.navCtrl.navigateForward(["payment"]);
  }
}
