import {Status} from './game-status';

export class GameLogic {

  gamefield: Array<number> = [];
  currentTurn: number;
  gameStatus: Status;

  winSituationOne: Array<Array<number>> = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
  ];

  winSituationTwo: Array<Array<number>> = [
    [2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2],
    [0, 2, 0, 0, 2, 0, 0, 2, 0],
    [0, 0, 1, 0, 0, 2, 0, 0, 2],
    [2, 0, 0, 0, 2, 0, 0, 0, 2],
  ];

  public constructor() {
    this.gameStatus = Status.STOP;
    this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  gameStart(): void{
    this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = this.randomPlayerStart();
    this.gameStatus = Status.START;
  }

  randomPlayerStart(): number{
    const startPlayer = Math.floor(Math.random() * 2) + 1;

    return startPlayer;
  }

  setField(position: number, value: number): boolean{
    if(this.gamefield[position] === 0) {
      this.gamefield[position] = value;
      return true;
    }
    else{
      alert('Campo no disponible');
      return false;
    }
  }

  getPlayerColorClass(): string{
    const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';

    return colorClass;
  }

  changePlayer(): void{
    this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
  }

  arrayEquals(a: Array<any>, b: Array<any>): boolean{
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
      a.every((value, index) => value === b[index]);
  }

  async checkGameEndFull(): Promise<boolean>{
    let isFull = true;

    if(this.gamefield.includes(0)){
      isFull = false;
    }

    if(isFull) { this.gameEnd(); }

    return isFull;
  }

  async checkGameEndWinner(): Promise<boolean>{
    let isWinner = false;
    const checkArray = (this.currentTurn === 1) ? this.winSituationOne: this.winSituationTwo;
    const currentArray = [];

    this.gamefield.forEach((subfield, index) =>{
      if(subfield !== this.currentTurn){
        currentArray[index] = 0;
      }
      else{
        currentArray[index] = subfield;
      }
    });

    checkArray.forEach((checkfield, checkindex) =>{
      if(this.arrayEquals(checkfield, currentArray)){
        isWinner = true;
      }
    });

    if(isWinner) {
      this.gameEnd();
      return true;
    }
    else{
      return false;
    }
  }

  gameEnd(): void{
    this.gameStatus = Status.END;
  }

}
