import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { UpdateService } from './update.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  winners: any[] = [];
  name:string | undefined
  constructor(private authservice: AuthService, private updateService: UpdateService) {

  }
  ngOnInit(): void {

    // setTimeout(()=>this.loadWinners(), 500)
    this.loadWinners()
  }
  logout() {
  this.authservice.logout();
  }

  loadWinners() {
    this.updateService.returnWinners().then(docs => {
          docs.forEach(ex => { this.winners.push(ex.data()); })
          console.log(this.winners);
          return this.winners
        })
  }

  updateWinners() {
    this.updateService.updateWinners();
    this.loadWinners();

  }
  massUpdatewinners() {
    this.updateService.massUpdate();
  }
}
