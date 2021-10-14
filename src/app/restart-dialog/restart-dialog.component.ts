import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-restart-dialog',
  templateUrl: './restart-dialog.component.html',
  styleUrls: ['./restart-dialog.component.scss']
})
export class RestartDialogComponent implements OnInit {

  mensaje: string = "";
  constructor(public dialogRef: MatDialogRef<RestartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.registrarEstadisiticas(this.data.datosJuego).subscribe(
      (resp: any) => this.mensaje = resp.message,
      error => {
        Swal.fire(error.error.errors.message, '', 'error')
      });
  }

}
