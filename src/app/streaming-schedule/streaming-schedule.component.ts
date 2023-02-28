import { Component } from '@angular/core';

@Component({
  selector: 'app-streaming-schedule',
  templateUrl: './streaming-schedule.component.html',
  styleUrls: ['./streaming-schedule.component.css']
})
export class StreamingScheduleComponent {
  selected: Date | null | undefined;
}
