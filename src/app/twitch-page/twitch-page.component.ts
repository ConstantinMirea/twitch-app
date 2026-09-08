import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare const Twitch: {
  Embed: new (element: string | HTMLElement, options: TwitchEmbedOptions) => void;
};

interface TwitchEmbedOptions {
  width: number;
  height: number;
  channel: string;
}

@Component({
  selector: 'app-twitch-page',
  templateUrl: './twitch-page.component.html',
  styleUrls: ['./twitch-page.component.css']
})
export class TwitchPageComponent implements OnInit {
  ngOnInit(): void {
    if (typeof Twitch !== 'undefined') {
      new Twitch.Embed('twitch-embed', {
        width: 1024,
        height: 650,
        channel: 'constantinsgamingchannel'
      });
    }
  }
}
