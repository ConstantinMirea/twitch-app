import { Component } from '@angular/core';

@Component({
  selector: 'app-streaming-schedule',
  templateUrl: './streaming-schedule.component.html',
  styleUrls: ['./streaming-schedule.component.css']
})
export class StreamingScheduleComponent {
  selected: Date | null | undefined;
  customDate: string | undefined;
  streamingInterval: string | undefined

  displayDate(): void {
    if (this.selected) {
      const date = this.selected;
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dayOfTheWeek = date.getDay();

      this.customDate = `${day}-${month}-${year}`;

      this.streamingInterval = dayOfTheWeek > 5 || dayOfTheWeek === 0
        ? '12:00 - 20:00'
        : '18:00 - 23:30';
    }
  }
}
