import { Component, OnInit } from '@angular/core';
import { Game} from '../../model/game';
import {GameLogic} from '../../logic/game-logic';
import { GameService } from '../../services/game.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameLogic, GameService]
})
export class GameComponent implements OnInit {
  public Game: Game;

  constructor(public game: GameLogic, private _gameService: GameService, private modalService: NgbModal) {
    this.Game = new Game(' ', ' ', null);
  }

  ngOnInit(): void {
    sessionStorage.removeItem('game');
  }

  open(targetModal) {
    const modalRef = this.modalService.open(targetModal,  {
     centered: true,
     backdrop: 'static'
   });
  }

  startGame(player_1?): void{

    if(sessionStorage.getItem('game')){
      const json = JSON.parse(sessionStorage.getItem('game'));
      const color = this.game.getPlayerColorClass();

      document.querySelectorAll('.subfield').forEach(function(item) {
        item.classList.remove('player-one');
        item.classList.remove('player-two');
      });

      this.Game.player_1 = json.player_1;

    }
    else{
      this.Game.player_1 = player_1;
    }

    this.Game.player_2 = 'Jugador 2';

    this.game.gameStart();

    const player_name = this.game.currentTurn === 1 ? this.Game.player_1 :   this.Game.player_2;

    const information = document.querySelector('.current-status');
    information.innerHTML = player_name;

    if(!sessionStorage.getItem('game')) this.registerGame();

  }

  async clickSubField(subfield: any): Promise<void>{
    if (this.game.gameStatus === 1){
      const position = subfield.currentTarget.getAttribute('position');

      const information = document.querySelector('.current-status');
      const player_name = this.game.currentTurn === 1 ? this.Game.player_1 :   this.Game.player_2;

      const field = this.game.setField(position, this.game.currentTurn);

      await this.game.checkGameEndWinner().then((end: boolean) =>{
        if(this.game.gameStatus === 2 && end){

          this.Game.winner = player_name;

          const json = JSON.parse(sessionStorage.getItem('game'));

          this.registerGame(Number(json.id));

          information.innerHTML = 'Ganador: ' + player_name;
        }
      });

      await this.game.checkGameEndFull().then((end: boolean) =>{
        if(this.game.gameStatus === 2 && end){
          information.innerHTML = 'Empate';
        }
      });

      if(field){
        const color = this.game.getPlayerColorClass();
        subfield.currentTarget.classList.add(color);
        this.game.changePlayer();
      }

      if(this.game.gameStatus === 1){
        const player_name = this.game.currentTurn === 1 ? this.Game.player_1 :   this.Game.player_2;
        information.innerHTML = player_name;
      }
    }
  }

  registerGame(id?: number){

    var id = typeof id !== 'undefined' ? id : 0;

    this._gameService.registerGame(this.Game, id).subscribe(
      response => {
        if(response.game){
          console.log(response.game);
          sessionStorage.setItem('game', JSON.stringify(response.game));
        }
        else{
          console.log('error');
        }
      },
      error =>{
        console.log(error);
      }
    );
  }
}
