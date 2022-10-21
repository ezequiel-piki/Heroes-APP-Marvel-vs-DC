import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl
  private usuarioLogueado : Auth | undefined

  get logueado ():Auth{
    return {...this.usuarioLogueado!}
  }
  constructor(private http:HttpClient) { }

  verificaAutenticacion():Observable<boolean>{
   
    if(!localStorage.getItem('token')){
     return of (false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).
    pipe(
      map(
        auth => {

          this.usuarioLogueado = auth;

          return true
        }
      )
    )
  }


  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap(auth=>this.usuarioLogueado=auth),
      tap(auth=>localStorage.setItem('token', auth.id))
    );
  }
  
  logOut(){
    this.usuarioLogueado = undefined;
  }
}
