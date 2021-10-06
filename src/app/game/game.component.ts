import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardData } from '../card-data.model';
import { RestartDialogComponent } from '../restart-dialog/restart-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  
  cardImages = [
    'imagen1.jpg',
    'imagen2.jpg',
    'imagen3.jpg',
    'imagen4.jpg',
    'imagen5.jpg',
    'imagen1.jpg',
    'imagen2.jpg',
    'imagen3.jpg',
    'imagen4.jpg',
    'imagen5.jpg',
    'imagen3.jpg',
    'imagen4.jpg',
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

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.setupCards();
  }

  tiempoJuego(){
    this.intervalo = setInterval(() => {
      
      if(this.minutos === 0){
        this.minutosString = '0'+this.minutos;
      }

      if(this.segundos === 60 && this.minutos < 10){
        // Con 0 despues de los 60 segundos
        this.minutos++;
        this.minutosString = '0'+this.minutos;
        this.segundos = 0;
      }else if(this.segundos === 60 && this.minutos > 9){
        // Sin 0 despues de los 60 segundos
        this.minutos++;
        this.minutosString = this.minutos.toString();
        this.segundos = 0;
      }
      if(this.minutos === 60){
        this.minutos = 0;
      }

      if(this.segundos < 10){
        // Con 0
        this.segundosString = '0'+this.segundos;
        this.segundos++;
      }else{ 
      // Sin 0
      this.segundosString = this.segundos.toString();
      this.segundos++;
      }
      // Tiempo unido
      this.tiempo = this.minutosString+':'+this.segundosString;
      console.log(this.tiempo);
    }, 1000);
  }

  setupCards(): void {
    this.tiempoJuego();
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
      console.log("Movimiento "+this.movimientos);
      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          const dialogRef = this.dialog.open(RestartDialogComponent, {
            disableClose: true
          });
          clearInterval(this.intervalo);
          dialogRef.afterClosed().subscribe(() => {
            this.restart();
          });
        }
      }else{
        this.desaciertos++;
        console.log("Fallo "+this.desaciertos);
      }

    }, 1000);
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
