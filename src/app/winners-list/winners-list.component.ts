import { Component, OnInit } from '@angular/core';
import { UpdateService } from '../admin-page/update.service';

@Component({
  selector: 'app-winners-list',
  templateUrl: './winners-list.component.html',
  styleUrls: ['./winners-list.component.css'],
})
export class WinnersListComponent implements OnInit {
  winnersArray: Record<string, unknown>[] = [];

  constructor(private updateService: UpdateService) {}

  ngOnInit(): void {
    this.updateService.returnWinners().then((docs) => {
      const winners: Record<string, unknown>[] = [];
      docs.forEach((doc) => {
        winners.push(doc.data() as Record<string, unknown>);
      });
      this.winnersArray = winners;
    });
  }
}
