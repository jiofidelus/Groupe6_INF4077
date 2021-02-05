import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,private router: Router) { } 

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if(localStorage.getItem('authuser') == null){
    //   this.router.navigate(['/connexion']);
    // }
      
    // let userstatus = JSON.parse(localStorage.getItem('authuser'));
    // console.log(userstatus)
    // return userstatus.isconnected;
    return true;
  }


}
  
