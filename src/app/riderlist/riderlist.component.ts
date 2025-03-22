import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-riderlist',
  templateUrl: './riderlist.component.html',
  styleUrl: './riderlist.component.scss',
  imports: [MatIconModule, MatButtonModule, MatListModule]
})
export class RiderlistComponent {
  riders: Array<string> = [
    "Fred",
    "George",
    "Belinda",
    "Gwen",
    "Megan",
    "Suzan",
    "David",
    "Cher"
  ]
}
