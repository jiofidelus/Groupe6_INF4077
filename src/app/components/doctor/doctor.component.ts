import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamResult } from 'src/app/models/exam-result.model';
import { MessagService } from 'src/app/services/messag.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  res : ExamResult = 
  { nom:'',sexe:'',age:0,
    symptomDate:new Date(),examDate:new Date(),
    diarhe:false,vomis:false,fievre:false,
    test:"",test_result:"",observation:"",dateajout: new Date(), nbsymtom:0
  }

  constructor(private router: Router, private msgService : MessagService) { }

  ngOnInit(): void {
    let connecteduser = JSON.parse(localStorage.getItem('authuser'));
    if(connecteduser == null || connecteduser.role != 'doctor'){
      let comp = '/'+connecteduser.role
      this.router.navigateByUrl(comp);
    }
  }

  sendResult(){
    console.log(this.res);
    if(this.res.fievre == true){
      this.res.nbsymtom = this.res.nbsymtom + 1;
    }
    if(this.res.vomis == true){
      this.res.nbsymtom = this.res.nbsymtom + 1;
    }
    if(this.res.diarhe == true){
      this.res.nbsymtom = this.res.nbsymtom + 1;
    }
    this.msgService.createResult(this.res);
  }

}
