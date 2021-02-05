import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { Signalment } from 'src/app/models/signalment.model';
import { MessagService} from 'src/app/services/messag.service';
import { AngularFireStorage } from "@angular/fire/storage";

declare const L:any;

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css']
})
export class SignalComponent implements OnInit {

  @ViewChild("video")
    public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;
  downloadURL: Observable<string>;
  fb;

  signal : Signalment = 
  { nom:'',telephone:'',imageurl:'',
    diarhe:false,vomis:false,fievre:false,
    concerne:false,dateajout: new Date()
  };

  constructor(private http: HttpClient, private storage: AngularFireStorage,private msServive : MessagService) { }

  ngOnInit(){
    this.captures = [];
    if(!navigator.geolocation){
      console.log('Gps not supported')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      const coords = position.coords;
      const LatLong = [coords.longitude, coords.latitude];
      console.log(`lat: ${position.coords.latitude}, long: ${position.coords.longitude}`);
      var mymap = L.map('mapid').setView(LatLong, 13);
      
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1Ijoia25pa2l0IiwiYSI6ImNraXRwbWRiYzBmbXczM211MXd0b2UxczMifQ.4Oi359M0sYPvQSjTo3ppfQ'
      }).addTo(mymap);

      var marker = L.marker(LatLong).addTo(mymap);
      marker.bindPopup('<strong>Hi</strong>');

      let popup = L.popup()
        .setLatLng(LatLong)
        .setContent("My position")
        .openOn(mymap);
    });
    
    this.watchPosition();
  }

  ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('true');
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          console.log('true2');
          const mediaStream = new MediaStream();
          // this.video.nativeElement.src = mediaStream;
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.onloadedmetadata = (e) => {
            this.video.nativeElement.play();
          };
            // this.video.nativeElement.src = window.URL.createObjectURL(stream);
            // this.video.nativeElement.play();
        });
    }
  }

  public capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }

  watchPosition(){
    let desLat;
    let desLong;
    let id=navigator.geolocation.watchPosition((position)=>{
      console.log(`lat: ${position.coords.latitude}, long: ${position.coords.longitude}`);
      if(position.coords.latitude==desLat){
        navigator.geolocation.clearWatch(id); 
      }
    },(err)=>{
      console.log(err);
    },{
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    })
  }


  sendSignal(){
    var n = Date.now();
    console.log(this.signal);

    const filePath = `uploads/`;
    const fileRef = this.storage.ref(filePath);

    this.canvas.nativeElement.toBlob(blob => {
      console.log(blob);
      const task = this.storage.upload(`EpiImages/${n}`, blob);
      task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              console.log('rec1');
              console.log(this.fb);
              this.signal.imageurl= this.fb;
              console.log(this.signal.imageurl);
              this.msServive.createSignal(this.signal);
              console.log('rec2');
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
    });


  }

  

  

 
  

}
