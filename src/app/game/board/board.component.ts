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

  moveHero(dir) {
    if (!this.directionCalculator.hasOwnProperty(dir)) {
      return false;
    }
    const nextPos = this.directionCalculator[dir](this.heroPosition);
    console.log('pos should change to', nextPos);
    if (this.isPositionFree(nextPos)) {
      console.log('in next')
      this.board[this.heroPosition.row][this.heroPosition.column] = '-';
      this.board[nextPos.row][nextPos.column] = 'h';
      this.heroPosition = nextPos;
      return true;
    }
    return false;
  }

  getValueFromPosition(pos) {
    return this.board[pos.row][pos.column];
  }

  isPositionFree(pos) {
    if (this.getValueFromPosition(pos) === '-') {
      return true;
    }
    return false;
  }

}
