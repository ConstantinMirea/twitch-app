import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twitch-page',
  templateUrl: './twitch-page.component.html',
  styleUrls: ['./twitch-page.component.css']
})
export class TwitchPageComponent implements OnInit {
  ngOnInit(): void {

    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression
    new Twitch.Embed('twitch-embed', {
      width: 1024,
      height: 650,
      channel: 'constantinsgamingchannel'
    });
  }

}
