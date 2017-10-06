import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { EntryApiService } from '../../services/entry-api.service';
import { AuthApiService } from '../../services/auth-api.service';
import { environment } from '../../../environments/environment';

declare var $:any;

@Component({
  selector: 'overview-cmp',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [
    trigger('fadeInOut', [
        state('off', style({
            'opacity': '1',
            transform: 'translateX(0)'
        })),
        state('on', style({
            'opacity': '1',
            transform: 'translateX(0)'
        })),
        transition('off <=> on', [
            animate(500, keyframes([
                style({
                    transform: 'translateX(0)',
                    opacity: 1,
                    offset: 0
                }),
                style({
                    transform: 'translateX(2%)',
                    opacity: 0,
                    offset: 0.4
                }),
                style({
                    transform: 'translateX(1%)',
                    opacity: 0.5,
                    offset: 0.7
                }),
                style({
                    transform: 'translateX(0)',
                    opacity: 1,
                    offset: 1
                })
            ]))
        ]),
    ])
  ]
})

export class OverviewComponent implements OnInit{

    weekClickCount = 0;
    weekDates: any[] = [];
    state = 'off';
    monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    // backend request variables
    userInfo: any;
    entries: any[] = [];
    // imageDomain = environment.apiUrl;

    constructor(
        private entryThang: EntryApiService,
        private authThang: AuthApiService
      ) { }

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

    ngOnInit() {
        // find date of previous Monday
        this.getMonday(new Date(), this.weekClickCount);

        // get all entries of user
        this.entryThang.getEntries()
        .subscribe(
            (entriesFromApi: any[]) => {
                this.entries = entriesFromApi;
                console.log(this.entries);
            }
        );
        this.authThang.getLoginStatus()
            .subscribe(
            (loggedInInfo: any) => {
                if (loggedInInfo.isLoggedIn) {
                this.userInfo = loggedInInfo.userInfo;
                console.log(this.userInfo)
                }
            }
        );
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
        // week determines user navigation through calendar, each click = 7 days later
        for (let i = 0; i < 7; i++) {
            this.weekDates.push(new Date(date.setDate(diff + i + (7 * week))));
        }
    }

    // when User clicks next week or previous week
    nextWeek() {
        this.weekClickCount++;
        this.getMonday(new Date(), this.weekClickCount);
    }

    prevWeek() {
        this.weekClickCount--;
        this.getMonday(new Date(), this.weekClickCount)
    }

    // delayNextWeek() {
    //     setTimeout(this.nextWeek(), 3000);
    // }
    // controls states of animation
    onAnimate() {
        this.state === 'off' ? this.state = 'on' : this.state = 'off';
        console.log(this.state);
    }
}
