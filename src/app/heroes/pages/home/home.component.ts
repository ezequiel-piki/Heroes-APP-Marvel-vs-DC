import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `.container  {
      margin : 10px;
    }`
  ]
})
export class HomeComponent implements OnInit {
  

  get logueado(){
  return this.authService.logueado;
  }

  constructor(private router : Router,
              private authService:AuthService ) { }

  ngOnInit(): void {
  }

  logOut(){
    this.router.navigate(['./auth'])
  }

}
