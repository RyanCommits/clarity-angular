import { Injectable } from '@angular/core';

@Injectable()
export class CalendarTrackService {

  weekClickCount = 0;

  constructor() { }

  nextWeek() {
      this.weekClickCount++;
      return this.weekClickCount;
  }

  prevWeek() {
      this.weekClickCount--;
      return this.weekClickCount;
  }
  // when User clicks next month or previous month
  nextMonth() {
      this.weekClickCount = this.weekClickCount + 4;
      return this.weekClickCount;
  }

  prevMonth() {
      this.weekClickCount = this.weekClickCount - 4;
      return this.weekClickCount;

  }

}
