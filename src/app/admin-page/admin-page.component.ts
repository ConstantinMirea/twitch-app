import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { UpdateService } from './update.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { gamesPlayed } from '../games-streamed/games-played';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  winners: any[] = [];
  games: any[] = [];
  // games2 = gamesPlayed;
  games2: any[] = [];
  name: string | undefined;
  editWinner: boolean = false;
  displayHeader = 'Winners list';
  // items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  constructor(
    private authservice: AuthService,
    private updateService: UpdateService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.loadWinners();
    this.loadGames();
  }
  logout() {
    this.authservice.logout();
  }

  loadWinners() {
    this.updateService.returnWinners().then((docs) => {
      docs.forEach((ex) => {
        this.winners.push({ ...ex.data(), id: ex.id });
      });
      // console.log(this.winners);
      return this.winners;
    });
  }

  loadGames() {
    this.updateService.returnGames().then((docs) => {
      docs.forEach((ex) => {
        this.games.push({ ...ex.data(), id: ex.id });
      });
      // console.log(this.games);
      this.games2 = [...this.games];
      // return this.winners;
    });
  }

  onSubmit(form: NgForm) {
    this.updateService.updateWinners(form.value.name);
    this.winners = [];
    this.loadWinners();
    this._snackBar.open('New winner added:', form.value.name);
    form.reset();
  }

  onSubmitGames(form2: NgForm) {
    this.updateService.updateGames(
      form2.value.title,
      form2.value.image,
      form2.value.link
    );
    // console.log(form2.value.title, form2.value.image, form2.value.link);
    this._snackBar.open('New game added:', form2.value.title);
    // this.winners = [];
    this.loadGames();
    form2.reset();
  }

  editWinners() {
    this.displayHeader = 'Pick a winner to delete';
    this.editWinner = true;
  }

  toggle(event: any) {
    if (this.editWinner) {
      this.updateService.deleteWinner(event.target.id);
      this._snackBar.open('List element deleted:', event.target.innerText);
      this.winners = this.winners.filter(
        (winner) => winner.data !== event.target.innerText
      );
      this.editWinner = false;
    }
  }

  massUpdatewinners() {
    this.updateService.massUpdate();
  }
  massUpdateGames() {
    this.updateService.massUpdateGames();
  }
}
