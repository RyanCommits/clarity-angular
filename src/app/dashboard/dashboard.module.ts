import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Autosize } from 'ng-autosize';

import { OverviewComponent } from './overview/overview.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { DashboardRoutes } from './dashboard.routing';
import { EditEntryComponent } from './edit-entry/edit-entry.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule
    ],
    declarations: [OverviewComponent, NewEntryComponent, Autosize, EditEntryComponent]
})

export class DashboardModule {}
