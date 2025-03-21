import { Component, Input, OnInit } from '@angular/core';
import { ArenaComponent } from '../arena/arena.component';

@Component({
    selector: 'app-frame',
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss'],
    imports: [ArenaComponent]
})
export class FrameComponent implements OnInit {
  @Input() selected=false;
  constructor() { }

  ngOnInit(): void {
  }

}
