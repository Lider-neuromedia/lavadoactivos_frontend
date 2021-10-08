import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Registro } from '../interfaces/registroUsuario';
import { Memoria } from '../interfaces/memoria';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.urlGlobal;
  private token = new BehaviorSubject(null);
  actualToken = this.token.asObservable();
  constructor(private http: HttpClient) { }

  cambiarToken(){
    this.consultarToken();
  }

  registrarUsuario(user: Registro){
    return this.http.post(`${this.url}/api/auth/register`, user);
  }

  registrarEstadisiticas(datosJuego: Memoria){
    const headers = new HttpHeaders( {'Authorization': `Bearer ${sessionStorage.getItem('token')}`} );
    return this.http.post(`${this.url}/api/game/statistics`, datosJuego, {headers: headers});
  }

  refrescarToken(){
    const headers = new HttpHeaders( {'Authorization': `Bearer ${sessionStorage.getItem('token')}`} );
    return this.http.post(`${this.url}/api/auth/refresh`,'',{headers: headers});
  }

  consultarToken(){
    this.token.next(sessionStorage.getItem('token'));
  }

  obtenerPreguntas(){
    const headers = new HttpHeaders( {'Authorization': `Bearer ${sessionStorage.getItem('token')}`} );
    return this.http.get(`${this.url}/api/quiz/questions`,{headers: headers});
  }

  guardarPreguntas(respuestas: any){
    const headers = new HttpHeaders( {'Authorization': `Bearer ${sessionStorage.getItem('token')}`} );
    return this.http.post(`${this.url}/api/quiz/respond`, respuestas ,{headers: headers});
  }
}
