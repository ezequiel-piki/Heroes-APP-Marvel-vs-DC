import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `img{
      width:100%;
      border-radius:5px;
    }`
  ]
})
export class HeroeComponent implements OnInit {

  constructor(
    
    private rutaActiva : ActivatedRoute,
    private heroeService : HeroesService,
    private router :Router
    ) { }


  heroe! : Heroe;

  ngOnInit(): void {
    /* id del heroe */
    /* console.log(heroe.id) */
   
    this.rutaActiva.params
    /* .subscribe(heroe=>{
      this.heroe = heroe['id'];
      console.log(this.heroe)
    }) */
    .pipe(
    switchMap( ({id}) => 
    
    this.heroeService.getHeroePorId(id)),
    tap(console.log))
     
    
    .subscribe(heroe => this.heroe=heroe)
    
}

regresar (){
  this.router.navigate(['/heroes/listado'])
}


}
