import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CardData } from '../card-data.model';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';
import { Memoria } from '../interfaces/memoria';
import { PreguntasDialogComponent } from '../preguntas-dialog/preguntas-dialog.component';
import { Router } from '@angular/router';
import { GraciasDialogComponent } from '../gracias-dialog/gracias-dialog.component';
import { DialogInicioComponent } from '../dialog-inicio/dialog-inicio.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {


  cardImages = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
  ];

  cards: CardData[] = [];
  flippedCards: CardData[] = [];
  intervalo: number;
  tiempo: string;
  minutos: number = 0;
  minutosString: string = "";
  segundos: number = 0;
  segundosString: string = "";
  matchedCount = 0;
  movimientos: number = 0;
  desaciertos: number = 0;
  popup;
  validadorTiempo: number = 0;
  datosJuego: Memoria = {
    movements: 0,
    bad_movements: 0,
    start_at: '',
    end_at: ''
  };
cerrarVideo: any;
  


  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {

  }
  ngOnDestroy(): void {
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.verVideo();
    this.setupCards();
  }

  verVideo(): void{
    let cerrarVideo = this.dialog.open(VideoDialogComponent, {
      disableClose: true
    });
    cerrarVideo.afterClosed().subscribe(() => {
      this.dialog.open(DialogInicioComponent, {
        disableClose: true
      })
    })
  }

  setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this.shuffleArray(this.cards);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];
    this.validadorTiempo++;
    if (this.validadorTiempo === 1) {
      this.datosJuego.start_at = moment(Date()).format("YYYY-MM-DD hh:mm:ss");
    }
    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;
      this.movimientos++;
      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          const encuesta = this.dialog.open(PreguntasDialogComponent, {
            disableClose: true,
          });
          encuesta.afterClosed().subscribe(() => {
            clearInterval(this.intervalo);
            this.datosJuego.movements = this.movimientos;
            this.datosJuego.bad_movements = this.desaciertos;
            this.datosJuego.end_at = moment(Date()).format("YYYY-MM-DD hh:mm:ss");
            this.guardarJuego();
          })
        }
      } else {
        this.desaciertos++;
      }

    }, 1000);
  }
  guardarJuego(){
    this.authService.registrarEstadisiticas(this.datosJuego).subscribe(
      (resp: any) => {
        let gracias = this.dialog.open(GraciasDialogComponent, {
          disableClose: true
        })
        gracias.afterClosed().subscribe(() => {
            this.router.navigateByUrl('/login');
        })
        
      },
      error => {
        Swal.fire(error.error.errors.message, '', 'error')
      });
  }
  restart(): void {
    this.matchedCount = 0;
    this.segundos = 0;
    this.minutos = 0;
    this.movimientos = 0;
    this.desaciertos = 0;
    this.setupCards();
  }


}
