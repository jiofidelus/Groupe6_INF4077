import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  url='https://api.web2sms237.com/sms/send/';

  constructor(private http: HttpClient) { }

  sendsms(num:string,content:string){
    console.log(num,content);
    let url=`https://www.easysendsms.com/sms/bulksms-api/bulksms-api?username=khriform2021&password=esm2469&from=NkGroup4077&to=${num}&text=${content}&type=0`;
    return this.http.get(url);

  }
}
