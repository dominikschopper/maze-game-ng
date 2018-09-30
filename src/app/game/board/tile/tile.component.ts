import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
  encapsulation: ViewEncapsulation.None
 
})
export class TileComponent implements OnInit {

  @Input() protected typeId: String;
  @Input() protected clear: Boolean;

  constructor() {

  }

  ngOnInit() {
    // console.log(this.typeId);
  }

}
