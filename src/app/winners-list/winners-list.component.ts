import { Component, OnInit } from '@angular/core';
import { winnersList } from "./winners-list";
import { UpdateService } from '../admin-page/update.service';
@Component({
  selector: 'app-winners-list',
  templateUrl: './winners-list.component.html',
  styleUrls: ['./winners-list.component.css'],
})
export class WinnersListComponent implements OnInit  {
  winnersArray: any[] = [];
  constructor(private updateService: UpdateService) {
    this.updateService.returnWinners().then(docs => {
      docs.forEach(ex => { this.winnersArray.push(ex.data()); })
      // console.log(this.winners);

    })

  }
  ngOnInit(): void {

  }
  // winnersArray = winnersList;
}
