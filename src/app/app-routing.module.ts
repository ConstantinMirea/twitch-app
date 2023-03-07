import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamesStreamedComponent } from './games-streamed/games-streamed.component';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';
import { StreamingScheduleComponent } from './streaming-schedule/streaming-schedule.component';
import { TwitchPageComponent } from './twitch-page/twitch-page.component';
import { WinnersListComponent } from './winners-list/winners-list.component';

const routes: Routes = [
  { path: '', component: AboutMeComponent },
  { path: 'twitch-page', component: TwitchPageComponent },
  { path: 'winner-list', component: WinnersListComponent },
  { path: 'games-streamed', component: GamesStreamedComponent },
  { path: 'streaming-schedule', component: StreamingScheduleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-page', component: AdminPageComponent, canActivate: [AuthGuard] },
  // { path: 'admin-page', component: AdminPageComponent },

  {path: 'error-page', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
