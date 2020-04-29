import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';

import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import axios from "axios";

interface user {
	username: string,
	uid: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: user

  

  constructor(private afAuth: AngularFireAuth, private firestore:AngularFirestore) {

  }
  

  
  newUser(user){
    return axios.post(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/userAdd`,user)
  }
  newMsj(data){
    return axios.post(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/notificationAdd`,data)
  }
  newJob(data){
    return axios.post(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/newJob`,data)
  }
  sendMsj(data){
    return axios.post(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/sendMsg`,data)
  }
  register(user){
    return axios.post(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/userRegister`,user)
  }
   updateUser(data){
    return axios.post(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/userAdd`, data)
  }
  
  pingServer(){
    return axios.get(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/hello`) 
  }

  getUser(data){
    return axios.post(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/getUser`,data) 
  }
  verifyUser(data){
    return axios.post(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/userVerify`,data) 
  }

  getProviders(){
    return axios.get(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/getProviders`) 
  }
  getCategories(){
    return axios.get(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/categories`) 
  }

  getJobs(){
    return axios.get(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/getJobs`) 
  }
  getNotifications(){
    return axios.get(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/allNotifications`) 
  }
  uploadFile(data){
    return axios.post(`https://us-central1-rapidnow-3ad8b.cloudfunctions.net/upload`,data) 
  }

   }