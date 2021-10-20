import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioRegistro: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.crearFormularioRegistro();
  }

  crearFormularioRegistro(){
    this.formularioRegistro = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      tipo: ['', [Validators.required]],
      acepto: [false, [Validators.required]],
      password: [''],
      password_confirmation: ['']
    })
  }

  soloNumeros(id: string){
		$(document).ready(function(){
			$(`#${id}`).on('input', function (evt) {
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			});
		});
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
  get Acepto(){
    return this.formularioRegistro.get('acepto').invalid && this.formularioRegistro.get('acepto').touched && !this.formularioRegistro.get('acepto').value;
  }

  guardarRegistro(){
    if(this.formularioRegistro.invalid){
      if(this.formularioRegistro.get('cedula').errors?.minlength){
        Swal.fire("Longitud minima de la cédula es de "+this.formularioRegistro.get('cedula').errors.minlength.requiredLength+" caracteres", '', 'warning');
      }
      if(this.formularioRegistro.get('cedula').errors?.maxlength){
        Swal.fire("Longitud máxima de la cédula es de "+this.formularioRegistro.get('cedula').errors.maxlength.requiredLength+" caracteres", '', 'warning');
      }
      if(this.formularioRegistro.get('celular').errors?.minlength){
        Swal.fire("Longitud minima de la celular es de "+this.formularioRegistro.get('celular').errors.minlength.requiredLength+" caracteres", '', 'warning');
      }
      if(this.formularioRegistro.get('celular').errors?.maxlength){
        Swal.fire("Longitud máxima de la celular es de "+this.formularioRegistro.get('celular').errors.maxlength.requiredLength+" caracteres", '', 'warning');
      }
      return Object.values( this.formularioRegistro.controls ).forEach(control => control.markAsTouched());
    }
    if(!this.formularioRegistro.get('acepto').value){
      Swal.fire('Debes aceptar las politicas de privacidad','','warning');
      return;
    }
    this.formularioRegistro.controls['password'].setValue(this.formularioRegistro.get('cedula').value);
    this.formularioRegistro.controls['password_confirmation'].setValue(this.formularioRegistro.get('cedula').value);
    Swal.fire('Validando información', 'Espere un momento...', 'info');
    Swal.showLoading()
    this.authService.registrarUsuario(this.formularioRegistro.value).subscribe((resp: any) => {
      sessionStorage.setItem('token', resp.access_token);
      Swal.close();
      this.router.navigateByUrl('/juego');
    }, error => {
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
