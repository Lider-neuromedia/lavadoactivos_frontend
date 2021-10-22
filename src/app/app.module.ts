import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './material/angular-material/angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCardComponent } from './game-card/game-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestartDialogComponent } from './restart-dialog/restart-dialog.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { PopupVideoComponent } from './popup-video/popup-video.component';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';
import { GraciasDialogComponent } from './gracias-dialog/gracias-dialog.component';
import { PreguntasDialogComponent } from './preguntas-dialog/preguntas-dialog.component';
import { DialogInicioComponent } from './dialog-inicio/dialog-inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCardComponent,
    RestartDialogComponent,
    LoginComponent,
    GameComponent,
    PopupVideoComponent,
    VideoDialogComponent,
    GraciasDialogComponent,
    PreguntasDialogComponent,
    DialogInicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
