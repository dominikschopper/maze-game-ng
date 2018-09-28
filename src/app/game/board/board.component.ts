import { Component, OnInit } from '@angular/core';
import { TileComponent } from './tile/tile.component';
import { BoardMap } from './board.map';
import { MapConfiguration } from './board.config';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  protected board: Array<Array<String>>;
  protected heroPosition: { row: number, column: number };
  
  protected fogDistance = 2;
  protected map: BoardMap;
  
  constructor() {
    this.heroPosition = {
      column: 9,
      row: 7
    };

    this.map.setMap(MapConfiguration[0]);
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
          this.map.moveHero(ev.key);
        break;
      }
    });
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

  protected isPositionSpace(pos) {
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
