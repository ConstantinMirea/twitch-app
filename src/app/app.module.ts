import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';

import { TwitchPageComponent } from './twitch-page/twitch-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { WinnersListComponent } from './winners-list/winners-list.component';
import { GamesStreamedComponent } from './games-streamed/games-streamed.component';
import { StreamingScheduleComponent } from './streaming-schedule/streaming-schedule.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CarouselComponent } from './carousel/carousel.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DarklordRigComponent } from './my-rigs/darklord-rig/darklord-rig.component';
import { MorpheusRigComponent } from './my-rigs/morpheus-rig/morpheus-rig.component';
import { Ps5RigComponent } from './my-rigs/ps5-rig/ps5-rig.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TwitchPageComponent,
    AboutMeComponent,
    WinnersListComponent,
    GamesStreamedComponent,
    StreamingScheduleComponent,
    CarouselComponent,
    DarklordRigComponent,
    MorpheusRigComponent,
    Ps5RigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTabsModule

  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
