import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { UpdateService } from './update.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from '@angular/fire/firestore';

interface FirebaseDoc {
  data(): Record<string, unknown>;
  id: string;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  winners: FirebaseDoc[] = [];
  games: FirebaseDoc[] = [];
  games2: FirebaseDoc[] = [];
  name: string | undefined;
  editWinner: boolean = false;
  editGame: boolean = false;

  constructor(
    private authservice: AuthService,
    private updateService: UpdateService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadWinners();
    this.loadGames();
  }

  logout(): void {
    this.authservice.logout();
  }

  loadWinners(): void {
    this.updateService.returnWinners().then((docs) => {
      const firebaseDocs: FirebaseDoc[] = [];
      docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        firebaseDocs.push({
          id: doc.id,
          data: () => doc.data() as Record<string, unknown>,
        });
      });
      this.winners = firebaseDocs;
    });
  }

  loadGames(): void {
    this.updateService.returnGames().then((docs) => {
      const firebaseDocs: FirebaseDoc[] = [];
      docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        firebaseDocs.push({
          id: doc.id,
          data: () => doc.data() as Record<string, unknown>,
        });
      });
      this.games = firebaseDocs;
      this.games2 = [...this.games];
    });
  }

  onSubmit(form: NgForm): void {
    this.updateService.updateWinners(form.value.name);
    this.winners = [];
    this.loadWinners();
    this._snackBar.open('New winner added:', form.value.name);
    form.reset();
  }

  onSubmitGames(form2: NgForm): void {
    this.updateService.updateGames(
      form2.value.title,
      form2.value.image,
      form2.value.link
    );
    this._snackBar.open('New game added:', form2.value.title);
    this.loadGames();
    form2.reset();
  }

  editWinners(): void {
    this.editWinner = !this.editWinner;
  }

  editGames(): void {
    this.editGame = !this.editGame;
  }

  toggle(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.editWinner) {
      this.updateService.deleteWinner(target.id);
      this._snackBar.open('List element deleted:', target.innerText);
      this.winners = this.winners.filter(
        (winner) => winner.data()['data'] !== target.innerText
      );
      this.editWinner = false;
    }
  }

  toggleGames(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.editGame) {
      this.updateService.deleteGame(target.id);
      this._snackBar.open('Game deleted:', target.innerText);
      this.games = this.games.filter(
        (game) => game.id !== target.id
      );
      this.games2 = [...this.games];
      this.editGame = false;
    }
  }
}
