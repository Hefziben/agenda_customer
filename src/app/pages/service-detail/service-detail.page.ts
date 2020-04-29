import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NavController, AlertController } from "@ionic/angular";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { UserService } from "../../shared/user.service";

@Component({
  selector: "app-service-detail",
  templateUrl: "./service-detail.page.html",
  styleUrls: ["./service-detail.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceDetailPage implements OnInit {
  isjobpost: any;
  data: any = {
    category: "AC",
    type: "AC Repair",
    company: "Mitsubishi",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptas recusandae cum doloribus delectus ea repellat at atque similique ipsam velit totam quam, necessitatibus ipsum enim nihil optio cumque facere.",
    timeSlot: [
      "08:30 AM",
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:30 PM",
      "01:00 PM",
      "02:30 PM",
      "03:00 PM",
      "04:30 PM",
      "05:00 PM",
      "06:30 PM",
    ],
  };
  eventSource;
  viewTitle;

  isToday: boolean;
  selected;
  description;
  calendar = {
    locale: 'es-PA',
    mode: "month",
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return "MonMH";
      },
      formatMonthViewTitle: function (date: Date) {
        return "testMT";
      },
      formatWeekViewDayHeader: function (date: Date) {
        return "MonWH";
      },
      formatWeekViewTitle: function (date: Date) {
        return "testWT";
      },
      formatWeekViewHourColumn: function (date: Date) {
        return "testWH";
      },
      formatDayViewHourColumn: function (date: Date) {
        return "testDH";
      },
      formatDayViewTitle: function (date: Date) {
        return "testDT";
      },
    },
  };
  activeSlot: any;
  service;
  user;
  provider;
  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private userService: UserService
  ) {
    if (localStorage.getItem("isjobpost") == "true") {
      this.isjobpost = true;
    } else {
      this.isjobpost = false;
    }
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.service = this.router.getCurrentNavigation().extras.state.service;
        this.provider = this.router.getCurrentNavigation().extras.state.provider;
        this.storage.get("user").then((data) => {
          this.user = data;
        });
      } else {
        this.router.navigate(["tabs/home"]);
      }
    });
  }

  ngOnInit() {
    this.loadEvents();
    this.today();
  }

  getDesc(event) {
    this.description = event.detail.value;
  }

  Booking() {
    if (localStorage.getItem("isLogin") == "true") {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const minutes = date.getMinutes();
      const day = date.getDate();
      const seconds = date.getMilliseconds();
      const id =  `${year}${month}${day}${minutes}${seconds}`;
      const data = {
        cliente: this.user,
        proveedor: this.provider,
        servicio: this.service,
        fecha: this.selected,
        hora: this.activeSlot,
        description: this.description,
        estado:{
          name:'Agendado',
          comment:"Esperando aprovación",
          code:''
        },
        id: id,
      };
      this.userService.newJob(data).then((res) => {
        this.storage.set("jobs", data);
        const msgData = {
          token:this.provider.msgToken,
          name: this.user.name,
          image:this.user.image,
          user:this.user.user,
          title:'Nuevo trabajo',
          body:'Tienes un nuevo trabajo esperando tu approvación',          
        }
        this.userService.newMsj(msgData).then(success =>{
          console.log(success);
          this.userService.sendMsj(msgData).then(result =>{
            console.log(result);
            
          })

                    
        })


        this.router.navigate(["tabs/booking"]);
      });
    } else {
      this.navCtrl.navigateForward("/login");
    }
    // if (localStorage.getItem('isjobpost') == 'true') {
    //   if (localStorage.getItem('isLogin') == 'true') {
    //     this.navCtrl.navigateForward(['post-status']);
    //   } else {
    //     this.navCtrl.navigateForward('/login');
    //   }
    // } else {
    //   if (localStorage.getItem('isLogin') == 'true') {
    //     this.navCtrl.navigateForward(['tabs/booking']);
    //   } else {
    //     this.navCtrl.navigateForward('/login');
    //   }
    // }
  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {}

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    this.selected = ev.selectedTime.toLocaleDateString();
    console.log(
      "Selected time: " +
        ev.selectedTime +
        ", hasEvents: " +
        (ev.events !== undefined && ev.events.length !== 0) +
        ", disabled: " +
        ev.disabled
    );
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: "All Day - " + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: "Event - " + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    return events;
  }
  setTimeSlot(data) {
    this.activeSlot = data;
  }

  onRangeChanged(ev) {}

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}
