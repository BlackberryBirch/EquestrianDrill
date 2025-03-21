import { Component, OnInit } from '@angular/core';
import { FrameComponent } from '../frame/frame.component';

@Component({
    selector: 'app-filmstrip',
    templateUrl: './filmstrip.component.html',
    styleUrls: ['./filmstrip.component.scss'],
    imports: [FrameComponent]
})
export class FilmstripComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
