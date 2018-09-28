import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.css']
})
export class ExitComponent implements OnInit {
  
  @Input() protected foggy:Boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
