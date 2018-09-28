import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  @Input() protected foggy: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
