import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  validarToken: boolean = false;
  constructor(private router: Router, private authService: AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      this.authService.refrescarToken().subscribe((resp: any) => {
        sessionStorage.setItem('token', resp.access_token)
        this.router.navigateByUrl('/juego');
        this.validarToken = true;
        this.authService.cambiarToken();
      }, error => {
        Swal.fire('No está autenticado', '', 'error').then(() => this.router.navigateByUrl('/login'));
        this.validarToken = false;
      })
      
      return this.validarToken;
  }
  
}
