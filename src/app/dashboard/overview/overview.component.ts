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
        // transition doesn't work with ngIf, since DOM does not exist
        // we use * => void animation to cover this
        transition(':enter', [
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

    dummyDate = new Date();

    weekClickCount = 0;
    weekDates: any[] = [];
    startDate: Date;
    endDate: Date;
    filteredArray: any;
    entryInDatabase: any[] = [];

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

        //////////////////////////////
        // get all entries of user
        //////////////////////////////

        this.entryThang.getEntries()
        .subscribe(
            (entriesFromApi: any[]) => {
                this.entries = entriesFromApi;
            },
            err => console.error(err),
            // when this.entries is populated, execute callback function that filters
            // dates based on range. Parameters provide start and end date
            () => this.filterEntries(this.entries, this.startDate, this.endDate)
        );

        this.authThang.getLoginStatus()
            .subscribe(
            (loggedInInfo: any) => {
                if (loggedInInfo.isLoggedIn) {
                this.userInfo = loggedInInfo.userInfo;
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
            diff = date.getDate() - day + (day === 0 ? -6:1) - 1 + (7 * week) ; // adjust when day is sunday
            date.setDate(diff);
        // create an array for 7 dates of the week
        // week determines user navigation through calendar, each click = 7 days later
        // set hours to not compare time, only the dates
        for (let i = 0; i < 7; i++) {
            this.weekDates.push(new Date(new Date(date.setDate(date.getDate() + 1)).setHours(0,0,0,0)));
        }
        // variables for the filter function.
        this.startDate = this.weekDates[0];
        this.endDate = this.weekDates[6];
    }

    // filter entries array based on date range. Date ranger provided by getMonday function
    filterEntries(entriesArray, startDate, endDate) {
        const standardizeTimeZone = this.dummyDate.toLocaleTimeString('en-us', {timeZoneName:'short'}).split(' ')[2]
        this.filteredArray = entriesArray.filter(function (oneEntry) {
            // turn oneEntry.date into a Date object, in order to boolean compare
            const datify = new Date(oneEntry.date + standardizeTimeZone)
            return datify >= startDate && datify <= endDate
        })
        console.log('filter works', this.filteredArray);
        // excute function that compares dates and whether entries exist
        this.doesEntryExist(this.weekDates, this.filteredArray);
    }
    // display an empty card or filled card depending on whether entry exists
    doesEntryExist(weekDatesArray, filteredArray) {
        // loop over both current week and database week to see if entry exists
        // if it does exist, push cardExists, a boolean, into an Array.
        // Final array will have 7 booleans, which the HTML will use as *ngIf's
        // getTime is required to boolean compare Date objects
        this.entryInDatabase = [];

        weekDatesArray.forEach((oneDay) => {
            let cardExists = false
            const standardizeTimeZone = this.dummyDate.toLocaleTimeString('en-us', {timeZoneName:'short'}).split(' ')[2]
            filteredArray.forEach((oneEntry) => {
                // compare the time values of each date. Set hours to 0 to standarize times
                if (oneDay.getTime() === new Date(oneEntry.date + standardizeTimeZone ).setHours(0,0,0,0)) {
                    cardExists = true
                    return;
                }
            })
            this.entryInDatabase.push(cardExists);
        })
    }


    // when User clicks next week or previous week
    nextWeek() {
        this.weekClickCount++;
        this.getMonday(new Date(), this.weekClickCount);
        this.filterEntries(this.entries, this.startDate, this.endDate)
    }

    prevWeek() {
        this.weekClickCount--;
        this.getMonday(new Date(), this.weekClickCount)
        this.filterEntries(this.entries, this.startDate, this.endDate)
    }

    // delayNextWeek() {
    //     setTimeout(this.nextWeek(), 3000);
    // }

    // controls states of animation
    onAnimate() {
        this.state === 'off' ? this.state = 'on' : this.state = 'off';
    }

    // the URL needs the date and month to be in DD and MM format
    // if less than 10, use 09, 05, etc.
    // this is required so that arrays can sort the days and months correctly
    ddDatify(dateFromArray) {
        if (dateFromArray < 10) {
            return '0' + dateFromArray;
        }
        return dateFromArray;
    }

    mmMonthify(monthFromArray) {
        if (monthFromArray < 10) {
            return '0' + monthFromArray;
        }
        return monthFromArray;
    }
}
