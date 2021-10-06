import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../interfaces/registroUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.urlGlobal;
  constructor(private http: HttpClient) { }

  registrarUsuario(user: Registro){
    return this.http.post(`${this.url}/api/auth/register`, user);
  }
}
