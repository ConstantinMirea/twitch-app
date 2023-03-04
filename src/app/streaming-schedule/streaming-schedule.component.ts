import { Component } from '@angular/core';

@Component({
  selector: 'app-streaming-schedule',
  templateUrl: './streaming-schedule.component.html',
  styleUrls: ['./streaming-schedule.component.css']
})
export class StreamingScheduleComponent {
  selected: Date | null | undefined;
  customDate: String | undefined;
  streamingInterval: string | undefined
  displayDate() {
    if (this.selected) {
      let date = this.selected;
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      let dayOfTheWeek = date.getDay();
console.log(dayOfTheWeek);
      this.customDate = day + '-' + month + '-' + year;

      if (dayOfTheWeek > 5 || dayOfTheWeek === 0) {

        this.streamingInterval = '12:00 - 20:00';
      } else {
        this.streamingInterval = '18:00 - 23:30';
      }
    }

  }
}
