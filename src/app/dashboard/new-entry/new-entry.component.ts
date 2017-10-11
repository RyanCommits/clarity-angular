import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntryInfo } from '../../interfaces/entry-info';
import { EntryApiService } from '../../services/entry-api.service';

@Component({
    selector: 'app-new-entry',
    templateUrl: './new-entry.component.html',
    styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent implements OnInit {

    // define variables to be completed
    newEntry: EntryInfo = {
        entryDate: '',
        entryImage: 'undefined',
        entryGrateful: [],
        entryWillAccomplish: [],
        entryAffirmation: '',
        entryDump: '',
        entryRating: null,
        entryAchievements: [],
        entryLearn: '',
        entryImprove: ''
    };

    errorMessage: string;

    constructor(
        private activatedThang: ActivatedRoute,
        private routerThang: Router,
        private entryThang: EntryApiService
      ) { }

    ngOnInit() {

    }

    saveEntryNoImage() {
      this.activatedThang.params
        .subscribe(
          (myParams) => {
            // grab individual params and turn into a string, pass into service
            const serviceParams = myParams.year + '/' + myParams.month + '/' + myParams.date;
            // fill in the date attribute of newEntry with the params
            const objectParams = myParams.year + '-' + myParams.month + '-' + myParams.date;
            this.newEntry.entryDate = objectParams;

            this.entryThang.postEntry(serviceParams, this.newEntry)
              .subscribe(
                (fullEntryDetails) => {
                  // console.log('New entry success', fullEntryDetails);

                  this.errorMessage = '';
                  this.routerThang.navigate(['dashboard']);
                },

                (errorInfo) => {
                  console.log('New entry error', errorInfo);

                  if (errorInfo.status === 400) {
                    this.errorMessage = 'Validation error';
                  } else {
                    this.errorMessage = 'Unknown error. Try again later.';
                  }
                  this.routerThang.navigate(['dashboard']);
                }
            );
          }
        );
    }
}
