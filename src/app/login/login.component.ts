import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { RestartDialogComponent } from '../restart-dialog/restart-dialog.component';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { GraciasDialogComponent } from '../gracias-dialog/gracias-dialog.component';
import { PreguntasDialogComponent } from '../preguntas-dialog/preguntas-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioRegistro: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(PreguntasDialogComponent, {
      disableClose: true,
    });
    this.crearFormularioRegistro();
  }

  crearFormularioRegistro(){
    this.formularioRegistro = this.fb.group({
      cedula: ['', [Validators.required, Validators.maxLength(11)]],
      nombre: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(11)]],
      tipo: ['', [Validators.required]],
      password: [''],
      password_confirmation: ['']
    })
  }

  get Cedula(){
    return this.formularioRegistro.get('cedula').invalid && this.formularioRegistro.get('cedula').touched;
  }
  get Nombre(){
    return this.formularioRegistro.get('nombre').invalid && this.formularioRegistro.get('nombre').touched;
  }
  get Correo(){
    return this.formularioRegistro.get('email').invalid && this.formularioRegistro.get('email').touched;
  }
  get Celular(){
    return this.formularioRegistro.get('celular').invalid && this.formularioRegistro.get('celular').touched;
  }
  get Tipo(){
    return this.formularioRegistro.get('tipo').invalid && this.formularioRegistro.get('tipo').touched;
  }

  guardarRegistro(){
    if(this.formularioRegistro.invalid){
      return Object.values( this.formularioRegistro.controls ).forEach(control => control.markAsTouched());
    }
    this.formularioRegistro.controls['password'].setValue(this.formularioRegistro.get('cedula').value);
    this.formularioRegistro.controls['password_confirmation'].setValue(this.formularioRegistro.get('cedula').value);
    console.log(this.formularioRegistro.value);
    Swal.fire('Validando información', 'Espere un momento...', 'info');
    Swal.showLoading()
    this.authService.registrarUsuario(this.formularioRegistro.value).subscribe((resp: any) => {
      sessionStorage.setItem('token', resp.access_token);
      Swal.fire('Usuario creado correctamente', '', 'success').then(() => {
        this.router.navigateByUrl('/juego');
      });
    }, error => {
      console.log(error.error.errors);
      if(error.error.errors.cedula && error.error.errors.email){
        Swal.fire('La cédula y el correo ya se encuentra registrada', '', 'error');
      }else if(error.error.errors.cedula){
        Swal.fire('La cédula ya se encuentra registrada', '', 'error');
      }else if(error.error.errors.email){
        Swal.fire('El correo ya se encuentra registrada', '', 'error');
      }
      
    })
  }
}
