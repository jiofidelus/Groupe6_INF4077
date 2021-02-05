import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  returnUrl: string;

  constructor(private route: ActivatedRoute,private router: Router,
    private auth : AuthService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('veli@outlook.fr'));
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(loginForm){
    console.log(loginForm.value);
    this.auth.login(loginForm.value.mail,loginForm.value.password);
  }

}
