import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EntryInfo } from '../../interfaces/entry-info';
import { EntryApiService } from '../../services/entry-api.service';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnInit {

    newEntry: EntryInfo = {
      entryDate: '',
      entryImage: 'undefined',
      entryGrateful: ['', '', ''],
      entryWillAccomplish: ['', '', ''],
      entryAffirmation: '',
      entryDump: '',
      entryRating: null,
      entryAchievements: ['', '', ''],
      entryLearn: '',
      entryImprove: ''
  };

  errorMessage: string;

  constructor(
    private activatedThang: ActivatedRoute,
    private routerThang: Router,
    private entryThang: EntryApiService,
    private router: Router
  ) { }

  ngOnInit() {

      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });

    this.activatedThang.params
    .subscribe(
      (myParams) => {
        // grab individual params and turn into a string, pass into service
        const serviceParams = myParams.year + '/' + myParams.month + '/' + myParams.date;

        this.entryThang.getEntry(serviceParams)
          .subscribe(
              (entryFromApi: any) => {
                  this.newEntry.entryDate = entryFromApi.date;
                  this.newEntry.entryGrateful = entryFromApi.grateful;
                  this.newEntry.entryWillAccomplish = entryFromApi.willAccomplish
                  this.newEntry.entryAffirmation = entryFromApi.affirmation
                  this.newEntry.entryDump = entryFromApi.dump
                  this.newEntry.entryRating = entryFromApi.rating;
                  this.newEntry.entryAchievements = entryFromApi.achievements
                  this.newEntry.entryLearn = entryFromApi.learn
                  this.newEntry.entryImprove = entryFromApi.improve
              }
          );
      }
    )
  }

  saveEntryNoImage() {
    this.activatedThang.params
      .subscribe(
        (myParams) => {
          // grab individual params and turn into a string, pass into service
          const serviceParams = myParams.year + '/' + myParams.month + '/' + myParams.date;

          this.entryThang.updateEntry(serviceParams, this.newEntry)
            .subscribe(
              (fullEntryDetails) => {
                // console.log('Update entry success', fullEntryDetails);

                this.errorMessage = '';
                this.routerThang.navigate(['dashboard']);
              },

              (errorInfo) => {
                console.log('Update entry error', errorInfo);

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
