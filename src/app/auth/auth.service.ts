import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  islogged:boolean;
    
  constructor(private http: HttpClient,private router: Router) { }

  login(email,pass) {
    console.log('yo');
    let user = JSON.parse(localStorage.getItem(email));
    console.log(user);
    if(user){
      let authuser = {
        name : user.name,
        role : user.role,
        isconnected : true
      };
      console.log('yo1');
      localStorage.setItem('authuser',JSON.stringify(authuser));
      this.islogged=true;
      console.log('yo2');
      if(user.role == 'expert'){
        this.router.navigate(['/expert']);
      }else if(user.role == 'doctor'){
        this.router.navigate(['/doctor']);
      }else{
        this.router.navigate(['/admin']);
      }
      console.log('yo3');
      return true;
    }
    console.log('pas connecté')
    this.router.navigate(['/connexion']);
    return false;
  }
  
  isloged(){
    return this.islogged;
  }

}
