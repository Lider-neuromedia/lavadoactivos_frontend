import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-preguntas-dialog',
  templateUrl: './preguntas-dialog.component.html',
  styleUrls: ['./preguntas-dialog.component.scss']
})
export class PreguntasDialogComponent implements OnInit {

  formularioPregunta1: FormGroup;
  formularioPregunta2: FormGroup;
  formularioPregunta3: FormGroup;
  esEditable: boolean = true;
  preguntas: any[] = [];
  answers: any = {
    answers: []
  };
  constructor(private fb: FormBuilder, private authService: AuthService , public dialogRef: MatDialogRef<PreguntasDialogComponent>) { }

  ngOnInit(): void {
    this.crearFormulariosPreguntas();
    this.traerPreguntas();
  }

  crearFormulariosPreguntas(){
    this.formularioPregunta1 = this.fb.group({
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required]
    });
    this.formularioPregunta2 = this.fb.group({
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required]
    });
    this.formularioPregunta3 = this.fb.group({
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required]
    });
  }

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  traerPreguntas(){
    let nombreFormularioGrupo: string = "formularioPregunta";
    this.authService.obtenerPreguntas().subscribe((resp: any) => {
      this.preguntas = this.shuffleArray(resp.questions);
      this.preguntas = this.preguntas.slice(0, 1);
      this.preguntas.forEach((pregunta, index) => {
        this[nombreFormularioGrupo+(index+1)].controls['pregunta'].setValue(pregunta.description);
      })
      
    }, error => {
      Swal.fire('No está autenticado', '', 'error');
    })
  }

  guardarRespuestas(){
    let nombreFormularioGrupo: string = "formularioPregunta";
    this.preguntas.forEach((pregunta, index) => {
      this.answers.answers.push({
              question_id: pregunta.id,
              option_id: this[nombreFormularioGrupo+(index+1)].get('respuesta').value
      })
  })
    this.authService.guardarPreguntas(this.answers).subscribe((resp: any) => {
      this.answers.answers.pop();
      this.dialogRef.close();
    }, error => {
      this.answers.answers.pop();
      Swal.fire('Debe seleccionar una opción', '', 'error');
    })
  }
}
