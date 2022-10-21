import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius:5px;
    }

    `
  ]
})
export class AgregarComponent implements OnInit {
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_image: '',
  }

  creadores = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];
  constructor(private heroesService: HeroesService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) { return; }



    this.rutaActiva.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id))
      )

      .subscribe
      ((heroe) => { this.heroe = heroe })

  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      /* actualizar */
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => {

        this.mostrarSnackBar('Registro actualizado')

      })
    } else {
      this.heroesService.agregarHeroe(this.heroe)

        .subscribe(resp => {
          this.router.navigate(['/heroes/editar', resp.id])
          this.mostrarSnackBar('Registro creado')
        })
    }
  }


  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.borrarHeroe(this.heroe.id!).subscribe(
            resp => {
              this.router.navigate(['/heroes']);
            }
          )

        }
      }
    )


  }

  mostrarSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, '!ok', { duration: 2500 })
  }
}
