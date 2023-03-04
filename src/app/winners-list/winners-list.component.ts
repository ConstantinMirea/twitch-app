import { Component } from '@angular/core';
import { winnersList } from "./winners-list";

@Component({
  selector: 'app-winners-list',
  templateUrl: './winners-list.component.html',
  styleUrls: ['./winners-list.component.css'],
})
export class WinnersListComponent {
  winnersArray = winnersList;
}
