import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessagService} from 'src/app/services/messag.service';
import { SmsService} from 'src/app/services/sms.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Messag } from 'src/app/models/messag.model'
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';

declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {

  title = 'micRecorder';
  fb;
  now = Date.now();
  msg:Messag = {subject:"", content:"", creationDate: new Date(), audiourl:""};
  audio:Blob;
  downloadURL: Observable<string>;

  //Lets declare Record OBJ
  record;

  //Will use this flag for toggeling recording
  recording = false;

  //URL of Blob
  url;
  error;

  constructor(
    private domSanitizer: DomSanitizer,  
    private http: HttpClient,
    private storage: AngularFireStorage,
    private firestore : AngularFirestore,
    private msServive : MessagService,
    private sms : SmsService,
    private router: Router
    ) {}

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  /**
  * Start recording.
  */
  initiateRecording() {
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  /**
  * Will be called automatically.
  */
  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 16000,
    };

    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
  * Stop recording.
  */
  stopRecording() {
  this.recording = false;
  this.record.stop(this.processRecording.bind(this));
  }
  /**
  * processRecording Do what ever you want with blob
  * @param  {any} blob Blog
  */
  processRecording(blob) {
  this.audio = blob;
  this.url = URL.createObjectURL(blob);
  console.log("blob", blob);
  console.log("url", this.url);
  }
  /**
  * Process Error.
  */
  errorCallback(error) {
  this.error = 'Can not play audio in your browser';
  }
  /**
  =====================================================================================================================
  =====================================================================================================================
  =====================================================================================================================
  =====================================================================================================================
  =====================================================================================================================
  */

  ngOnInit(): void {

    let connecteduser = JSON.parse(localStorage.getItem('authuser'));
    console.log('ya');
    // if(connecteduser == null || connecteduser.role != 'expert'){
    //   console.log('ya2');
    //   let comp = '/'+connecteduser.role;
    //   console.log(comp);
    //   this.router.navigate([comp]);
    // }
    //this.msg = new Messag();
    //this.msg.subject="";
    //this.msg.content="";
    //this.msg.creationDate=new Date();

    //this.firestore.collection("messages").doc("msg0")
    //.get().subscribe((res => {
    //console.log(res.data());
    //}));


  }

  
  submitData(){

  console.log(this.msg);
  const filePath = `uploads/Epiaudios/`;
  const fileRef = this.storage.ref(filePath);
    console.log(this.audio);
    const task = this.storage.upload(`Epiaudios/${this.now}`, this.audio);
    task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb = url;
            console.log('aud1');
            console.log(this.fb);
            this.msg.audiourl= this.fb;
            console.log(this.msg);
            this.msServive.createMessag(this.msg);
            console.log('aud2');
          }
          console.log(this.fb);
        });
      })
    )
    .subscribe(url => {
      if (url) {
        console.log(url);
      }
    });


    
  }



}
