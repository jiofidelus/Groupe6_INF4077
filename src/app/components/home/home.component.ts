import { Component, OnInit } from '@angular/core';
// import axios from 'axios';
import axios, { AxiosInstance } from 'axios';
import { MessagService } from 'src/app/services/messag.service';
import { SmsService } from 'src/app/services/sms.service';
import { Surveymode } from 'src/app/models/surveymode.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // survey1:Surveymode={
  //   id:'survey 1',
  //   nom : 'Surveillance Localisé',
  //   phase : 'Mode utilisé pour les debut de la crise au nivau local',
  //   description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Omnis iure hic culpa inventore dolorem odio alias blanditiis',
  //   activate : true
  // };
  // survey2:Surveymode={
  //   id:'survey 2',
  //   nom : 'Surveillance Regroupée',
  //   phase : 'Mode utilisé pour les crises ayant touche des cible venant d\'environement different',
  //   description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Omnis iure hic culpa inventore dolorem odio alias blanditiis',
  //   activate : false
  // };
  // survey3:Surveymode={
  //   id:'survey 3',
  //   nom : 'Surveillance Globalisé',
  //   phase : 'Mode utilisé pour les crises avancé s\'etandant sur tout un territoire',
  //   description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Omnis iure hic culpa inventore dolorem odio alias blanditiis',
  //   activate : false
  // };

  

  constructor(private smssender : SmsService,private msServive : MessagService) { }

  ngOnInit(): void {

    // this.smssender.sendsms('','').subscribe(data => {
    //   console.log(data);
    // });

    let user1 = {
    name : '_Mojavel 84',
    role : 'admin',
    email : 'mojotrone@outlook.fr',
    password : 'bittrix84',
    isconnected : true
  };
  let user2 = {
    name : 'Franck Vitz',
    role : 'doctor',
    email : 'didib@outlook.fr',
    password : 'kazama_atoyama',
    isconnected : false
  };
  let user3 = {
    name : 'Dr. Mike Metz',
    role : 'expert',
    email : 'veli@outlook.fr',
    password : 'mojotrone2',
    isconnected : false
  };


  // this.msServive.createMode(this.survey1);
  // this.msServive.createMode(this.survey2);
  // this.msServive.createMode(this.survey3);


    localStorage.clear();
    localStorage.setItem('mojotrone@outlook.fr',JSON.stringify(user1));
    localStorage.setItem('didib@outlook.fr',JSON.stringify(user2));
    localStorage.setItem('veli@outlook.fr',JSON.stringify(user3));
    console.log(localStorage.getItem('mojotrone@outlook.fr'));

    
    // axios.post(
    //   'https://api.web2sms237.com/token',
    //   {
    //     headers : {
    //       'Authorization': 'Basic OTI3NjM0M2YtNDQxOS00ZjBjLWJiZmEtMGViM2VhYWJhMTgyOjBlNjg3MTZhYWJlODlhNWIyY2Q2ZTk1NWEzMDBlOTNj', 
    //     }
    //   }
    // ).then((data: {})=>{
    //   console.log(data)
    // })
    
      // axios.post(
      //   'https://api.web2sms237.com/sms/send',
      //   {
      //     "sender_id" : "MyApp",
      //     "phone" : "+237691909859",
      //     "text": "Bonjour et Bienvenue dans le service de messagerie par defaut de notre site",
      //     "flash" : false
      //   }, 
      //   {
      //     headers : {
      //       'Authorization': 'Bearer SqMScE1isugWAjXyD6SU83PFI=', 
      //       'Content-Type': 'application/json' 
      //     }
      //   }
      // ).then((data: {})=>{
      //   console.log(data)
      // })
      // .catch((error: any)=>{
      //   console.log(error);
      // });
    


  }

}
