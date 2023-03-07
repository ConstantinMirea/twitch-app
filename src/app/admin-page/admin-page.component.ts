import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { UpdateService } from './update.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  winners: any[] = [];
  name: string | undefined
  editWinner: boolean = false;
  displayHeader = "Winners list";


  constructor(private authservice: AuthService, private updateService: UpdateService, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {

    // setTimeout(()=>this.loadWinners(), 500)
    this.loadWinners();
  }
  logout() {
  this.authservice.logout();
  }

  loadWinners() {
    this.updateService.returnWinners().then(docs => {
          docs.forEach(ex => { this.winners.push({...ex.data(), id:ex.id}); })
          // console.log(this.winners);
      return this.winners;
        })
  }

  onSubmit(form:NgForm) {
    this.updateService.updateWinners(form.value.name);
    this.winners = [];
    this.loadWinners();

  }

  editWinners() {
    this.displayHeader = "Pick a winner to delete";
    this.editWinner = true;
  }

  toggle(event: any) {
    if (this.editWinner) {
      this.updateService.deleteWinner(event.target.id);
      this._snackBar.open("List element deleted", event.target.innerText);
      this.winners = this.winners.filter(winner => winner.data !== event.target.innerText);
      this.editWinner = false;
    }
  }

  massUpdatewinners() {
    this.updateService.massUpdate();
  }
}
