import { Component } from '@angular/core';
import { TopbarComponent } from './topbar/topbar.component';
import { EditorComponent } from './editor/editor.component';
import { FilmstripComponent } from './filmstrip/filmstrip.component';
import { RouterOutlet } from '@angular/router';
import { RiderlistComponent } from './riderlist/riderlist.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [TopbarComponent, EditorComponent, FilmstripComponent, RiderlistComponent, RouterOutlet]
})
export class AppComponent {
  title = 'EquestrianDrill';
}
