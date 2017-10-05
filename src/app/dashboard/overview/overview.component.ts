import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

declare var $:any;

@Component({
  selector: 'overview-cmp',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit{

    weekClickCount = 0;
    weekDates: any[] = [];
    monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    initCirclePercentage() {
        $('#chartDashboard, #chartOrders, #chartNewVisitors, #chartSubscriptions, #chartDashboardDoc, #chartOrdersDoc').easyPieChart({
            lineWidth: 6,
            size: 160,
            scaleColor: false,
            trackColor: 'rgba(255,255,255,.25)',
            barColor: '#FFFFFF',
            animate: ({duration: 5000, enabled: true})
        });
    }

    ngOnInit(){
        // find date of previous Monday
        this.getMonday(new Date(), this.weekClickCount);

    }
    ngAfterViewInit() {
        this.initCirclePercentage();
    }

    getMonday(date, week) {
        this.weekDates = [];
        date = new Date(date);
        const day = date.getDay(),
            diff = date.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
        // create an array for 7 dates of the week

        for (let i = 0; i < 7; i++) {
            this.weekDates.push(new Date(date.setDate(diff + i + (7 * week))));
        }
    }

    nextWeek() {
        this.weekClickCount++;
        this.getMonday(new Date(), this.weekClickCount)
    }

    prevWeek() {
        this.weekClickCount--;
        this.getMonday(new Date(), this.weekClickCount)
    }
}
