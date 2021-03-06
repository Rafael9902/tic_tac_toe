import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { Game} from '../model/game';
import {GLOBAL} from './global';

@Injectable()
export class GameService{
  public url: string;


  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  test(){
    return 'hello world';
  }

  registerGame(game: Game, id :number): Observable<any>{
    const json = JSON.stringify(game);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    console.log(params);

    var uri = id !== 0 ? 'save/' + id : 'save'

    return this._http.post(this.url + uri, params, {headers: headers});
  }

}
