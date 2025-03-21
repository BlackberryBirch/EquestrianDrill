import { Component, OnInit } from '@angular/core';
import { ArenaComponent } from '../arena/arena.component';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    imports: [ArenaComponent]
})
export class EditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

