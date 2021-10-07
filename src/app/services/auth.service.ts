import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro } from '../interfaces/registroUsuario';
import { Memoria } from '../interfaces/memoria';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.urlGlobal;
  constructor(private http: HttpClient) { }

  registrarUsuario(user: Registro){
    return this.http.post(`${this.url}/api/auth/register`, user);
  }

  registrarEstadisiticas(datosJuego: Memoria){
    const headers = new HttpHeaders( {'Authorization': `Bearer ${sessionStorage.getItem('token')}`} );
    return this.http.post(`${this.url}/api/game/statistics`, datosJuego, {headers: headers});
  }
}
