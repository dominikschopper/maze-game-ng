import { Component, OnInit } from '@angular/core';
import { TileComponent } from './tile/tile.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  protected board: Array<Array<String>>;
  protected heroPosition: { row: number, column: number };
  protected readonly directionCalculator = {
    ArrowUp: (pos) => {
      return { ...pos, row: pos.row - 1 };
    },
    ArrowDown: (pos) => {
      return { ...pos, row: pos.row + 1 };
    },
    ArrowLeft: (pos) => {
      return { ...pos, column: pos.column - 1 };
    },
    ArrowRight: (pos) => {
      return { ...pos, column: pos.column + 1 };
    }
  }
  protected fogDistance = 2;
  
  constructor() {

    this.heroPosition = {
      column: 9,
      row: 7
    }

    this.board = [
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', '-', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', '-', '-', 'w', '-', '-', '-', '-', '-', 'h', '-', '-', 'w', 'w', '-', 'w', 'w', 'w', '-', 'w'],
      ['e', '-', '-', 'w', '-', '-', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', 'w', '-', '-', 'e'],
      ['w', '-', '-', 'w', '-', '-', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', '-', '-', 'w', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', 'w', 'w', 'w', 'w', 'w', '-', '-', 'w', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', 'w', '-', 'w', 'w'],
      ['w', '-', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', 'w', '-', '-', 'w', '-', '-', '-', 'w', '-', '-', '-', '-', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', 'w', '-', '-', 'w', '-', '-', '-', 'w', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', '-', '-', '-', '-', 'w', '-', '-', 'w', '-', '-', '-', 'w', '-', '-', '-', 'w', '-', '-', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']

    ];
  }

  ngOnInit() {
    document.addEventListener('keypress', (ev) => {
      console.log('keypress', ev.key, this);
      switch (ev.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          ev.preventDefault();
          this.moveHero(ev.key);
        break;
      }
    });
  }

  protected moveHero(dir) {
    if (!this.directionCalculator.hasOwnProperty(dir)) {
      return false;
    }
  
    const nextPos = this.directionCalculator[dir](this.heroPosition);
  
    if (this.isPositionFree(nextPos)) {
      this.board[this.heroPosition.row][this.heroPosition.column] = this.ttypes.SPACE;
      this.board[nextPos.row][nextPos.column] = this.ttypes.HERO;
      this.heroPosition = nextPos;
      return true;
    }

    return false;
  }

  protected getValueFromPosition(pos) {
    return this.board[pos.row][pos.column];
  }

  protected shouldElementBeFoggy(pos) {
    if (pos.row < this.heroPosition.row -  + this.fogDistance || pos.row > this.heroPosition.row + this.fogDistance) {
      return true;
    }
    if (pos.column < this.heroPosition.column -  + this.fogDistance || pos.column > this.heroPosition.column + this.fogDistance) {
      return true;
    }
    return false;
  }

  protected isPositionFree(pos) {
    if (this.getValueFromPosition(pos) === this.ttypes.SPACE) {
      return true;
    }
    return false;
  }

  protected isPositionWall(pos) {
    if (this.getValueFromPosition(pos) === this.ttypes.WALL) {
      return true;
    }
    return false;
  } 

}
