import { Component, OnInit } from '@angular/core';
import { TileComponent } from './tile/tile.component';
import BoardMap from './board.map';
import MapConfiguration from './board.config';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  protected map: Array<Array<String>>;  
  protected mapWrapper: BoardMap;
  
  constructor() {
    this.mapWrapper = new BoardMap();
    this.mapWrapper.setMap(MapConfiguration[0]);
    this.map = this.mapWrapper.getMap();
  }

  ngOnInit() {
    document.addEventListener('keypress', (ev) => {
      switch (ev.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          ev.preventDefault();
          const dir = ev.key.replace('Arrow', '').toLocaleLowerCase();
          this.mapWrapper.moveHero(dir);
          this.map = this.mapWrapper.getMap();
        break;
      }
    });
  }

}
