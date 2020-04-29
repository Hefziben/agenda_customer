import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { storage } from 'firebase';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserService } from "../../shared/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  editbtn: any = 0;
  data: any = {
    name: 'Larry Gordon',
    email: 'larrygordon@gmail.com',
    phone: '+44 903 365 8768',
    address: 'Rain Charm House Park, London'
  };
  public myFile;
  public user;
  public addressList;
  public content = false;
  public update = false;
  public imageUrl;
  public userForm:FormGroup;
  constructor(
    private storage:Storage, 
    private navCtrl:NavController,
    private fb:FormBuilder,
    private userService:UserService,
    private loading:LoadingController,
    private toast:ToastController,
  
    ) {
    this.userForm = this.fb.group({
      name:[''],
      address:['']
    })
  }

  ngOnInit() {


  }
  ionViewWillEnter(){
    this.storage.get('user').then(data =>{
      if(data){
        this.user = data;
        this.addressList = this.user.address;
        this.content = true;
        
      } else{            
    this.navCtrl.navigateRoot('login');
      }
    })

    
  }


    selectImage2(event) {
      this.update = true;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myFile = file;
    }
  }
  editData() {
    this.editbtn = 1;
  }
  changed(event, index){
    this.update = true;
    const value = event.detail.value;
    this.user.address[index].detail = value;
  }
  changedName(event){    
    this.update = true;
  }
  newAddress(){
    this.navCtrl.navigateForward(['address'])
    
  }
  uploadFile(){

     
  }
  saveData() {   
    this.editbtn = 0;   
    if(this.update == false){
      this.presentToast();
      return
     }else{
      if(this.myFile){
        this.presentLoading();
        const uploadData = new FormData();
        uploadData.append("folder", "users");
        uploadData.append("image", this.myFile)
        this.userService.uploadFile(uploadData).then(res =>{
          this.user.image = res.data.fileUrl;       
        }).then(()=>{
          if(this.userForm.value.name){
            this.user.name = this.userForm.value.name;
          }          
          this.userService.newUser(this.user).then(data=>{
            this.storage.set('user', this.user).then(res =>{
              this.update = false;
              this.dismissLoading();
              this.presentToast();
              
            })
            
          })


        })
  
      } else{
        if(this.userForm.value.name){
          this.user.name = this.userForm.value.name;        
        }
        this.userService.newUser(this.user).then(data=>{
          this.storage.set('user', this.user).then(res =>{
            this.update = false;
            this.dismissLoading();
            this.presentToast();
            
          })
          
        });

      }
     }  
    
   
      
      

      
    
  }
  async presentLoading() {
    const loading = await this.loading.create({
      spinner: 'bubbles'
    });
    await loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: 'datos guardados.',
      duration: 2000
    });
    toast.present();
  }
}
