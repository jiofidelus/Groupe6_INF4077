import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Messag } from 'src/app/models/messag.model';
import { Sms } from 'src/app/models/sms.model';
import { Stats } from 'src/app/models/stats.model';
import { Signalment } from 'src/app/models/signalment.model';
import { ExamResult } from 'src/app/models/exam-result.model';
import { Surveymode } from '../models/surveymode.model';

@Injectable({
  providedIn: 'root'
})
export class MessagService {

  constructor(private firestore : AngularFirestore) { }

  //=== Message(expert) helpers====//
  getMessag(){
    return this.firestore.collection('messages').snapshotChanges();
  }
  getLastMessag(){
    return this.firestore.collection('messages', ref => ref.orderBy('creationDate','desc')
      .limit(2)).snapshotChanges();
  }
  createMessag(msg : Messag){
    this.firestore.collection("messages").add(msg);
  }
  //=== Message(expert) helpers====//

  
  //=== Examresult(doctor) helpers====//
  getResults(){
    return this.firestore.collection('testresult').snapshotChanges();
  }
  getLastResults(){
    return this.firestore.collection('testresult', ref => ref.orderBy('dateajout','desc')
      .limit(2)).snapshotChanges();
  }
  createResult(result:ExamResult){
    this.firestore.collection("testresult").add(result);
  }
  //=== Examresult(doctor) helpers====//


  //=== Signalment(visitor) helpers====//
  getSignal(){
    return this.firestore.collection('signalement').snapshotChanges();
  }
  getLastSignal(){
    return this.firestore.collection('signalement', ref => ref.orderBy('dateajout','desc')
      .limit(2)).snapshotChanges();
  }
  createSignal(sign:Signalment){
    console.log('rec21');
    this.firestore.collection("signalement").add(sign);
    console.log('rec22');
  }
  //=== Signalment(visitor) helpers====//


  //=== Sms(Admin) helpers====//
  getSms(){
    this.firestore.collection('sms').snapshotChanges();
  }
  createSms(sms:Sms){
    this.firestore.collection("sms").add(sms);
  }
  //=== Sms(Admin) helpers====//


  //=== Stats(Admin) helpers====//
  getStats() {
    return this.firestore.collection('stats').snapshotChanges();
  }
  //=== Survey Modes(Admin) helpers====//
  getModes() {
    return this.firestore.collection('surveymode').snapshotChanges();
  }
  createMode(mode:Surveymode){
    this.firestore.collection("surveymode").add(mode);
  }
  

}




























































// let date = new Date()
    // this.firestore.collection("signalement").doc("sign0")
    //   .set({
    //     nom: nom, 
    //     telephone: tel,
    //     vomis : vom,
    //     diarhe : dia,
    //     fievre : fie,
    //     concerne :  con }
    //   );

     // let date = new Date()
    // this.firestore.collection("sms").doc("sms0")
    //   .set({
    //     message: msg, 
    //     num_destinataire: dst }
    //   );

       // let date = new Date()
    // this.firestore.collection("testreult").doc("res0")
    //   .set({
    //     nom: nom, 
    //     sexe: sex,
    //     age: age,
    //     symptomDate: symptdat,
    //     examDate: examdat;
    //     vomis : vom,
    //     diarhe : dia,
    //     fievre : fie,
    //     test: test,
    //     test_result: testres }
    //   );
        // let date = new Date()
    // this.firestore.collection("messages").doc("msg0")
    //   .set({
    //     subject: sj, 
    //     content: ct, 
    //     creationDate: cd,
    //     num_telephone: num }
    //   );
  