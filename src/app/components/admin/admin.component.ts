import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MessagService} from 'src/app/services/messag.service';
import { SmsService } from 'src/app/services/sms.service';
import { Sms } from 'src/app/models/sms.model';
import { Stats } from 'src/app/models/stats.model';
import { Messag } from 'src/app/models/messag.model';
import { Signalment } from 'src/app/models/signalment.model';
import { ExamResult } from 'src/app/models/exam-result.model';
import { Surveymode } from 'src/app/models/surveymode.model';


interface Messages {
	type: "signal" | "messag" | "testresult";
	value: object[];
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  messages:Messages[]=[];

  //tab1
  messags:Messag[]; 
  signal2:Signalment[]; 
  results:ExamResult[]; 
  nbsymtom=0;
  cfsymtom=0;

  //tab2
  modes:Surveymode[]; 
  signals:Signalment[]; 

  //tab4
  stats:Stats[];  

  msg : Sms = {message: '', num_destinataire: ''};
  newres : ExamResult = { 
    nom:'', sexe:'', age:0,
    symptomDate: new Date(), examDate: new Date(),
    diarhe:false, vomis:false, fievre:false,
    test:'', test_result:'', observation:'',
    dateajout: new Date(), nbsymtom:0
  };

  text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ipsum officia voluptatum iusto inventore hic non fugiat quam consectetur dignissimos cumque minus, sunt a quia! Saepe nulla soluta recusandae odit!";

  @ViewChild("header") myheader: ElementRef;

  constructor(private router: Router, private msgService : MessagService,private smssender : SmsService,private msServive : MessagService) { }

  ngOnInit(): void {
    console.log(this.messages);
    //all modes
    this.msServive.getModes().subscribe(data => {
      this.modes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {} 
        } as Surveymode;
      })
      console.log(this.modes);
    });

    //all stats
    this.msServive.getStats().subscribe(data => {
      this.stats = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {} 
        } as Stats;
      })
      console.log(this.stats);
    });

    //all signalment
    this.msServive.getSignal().subscribe(data => {
      this.signals = data.map(e => {
        return {
          ...e.payload.doc.data() as {} 
        } as Signalment;
      })
      console.log(this.signals);
    });

    //last signalment
    this.msServive.getLastSignal().subscribe(data => {
      this.signal2 = data.map(e => {
        return {
          ...e.payload.doc.data() as {} 
        } as Signalment;
      });
      console.log(this.signal2);
      let obj:Messages = {
        type:"signal",
        value: this.signal2
      }
      this.messages.push(obj);
    });

    //last message
    this.msServive.getLastMessag().subscribe(data => {
      this.messags = data.map(e => {
        return {
          ...e.payload.doc.data() as {} 
        } as Messag;
      });
      console.log(this.messags);
      let obj:Messages = {
        type:"messag",
        value: this.messags
      }
      this.messages.push(obj);
    });

    //last examresult
    this.msServive.getLastResults().subscribe(data => {
      this.results = data.map(e => {
        return {
          ...e.payload.doc.data() as {} 
        } as ExamResult;
      });
      console.log(this.results);
      let obj:Messages = {
        type:"testresult",
        value: this.results
      }
      this.messages.push(obj);
    });

    // console.log(this.messages);
    //let connecteduser = JSON.parse(localStorage.getItem('authuser'));
    //if(connecteduser == null || connecteduser.role != 'admin'){
    //  let comp = '/'+connecteduser.role
    //  this.router.navigateByUrl(comp);
    //}

  }

  ngAfterViewInit() {
    //console.log(this.messages);
  }

  sendMessage(){
  	this.smssender.sendsms(this.msg.num_destinataire,this.msg.message).subscribe(data => {
      console.log(data);
    });
  }

}
