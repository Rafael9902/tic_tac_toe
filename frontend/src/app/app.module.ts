import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import {RouterTestingModule} from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpHeaders} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
    imports: [
        BrowserModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
