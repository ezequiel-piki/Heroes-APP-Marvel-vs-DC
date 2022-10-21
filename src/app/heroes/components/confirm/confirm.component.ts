import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interface/heroes.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [
  ]
})
export class ConfirmComponent implements OnInit {
  
  constructor(private dialogRef:MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe) { }

  ngOnInit(): void {
  
  }

  cancelar(){
   this.dialogRef.close()
  }

  borrar(){
    this.dialogRef.close(true)
    
  }

}
