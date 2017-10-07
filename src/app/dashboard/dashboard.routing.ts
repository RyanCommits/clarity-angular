import { Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { NewEntryComponent } from './new-entry/new-entry.component';

export const DashboardRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: OverviewComponent
    }, {
        path: 'new/:year/:month/:date',
        component: NewEntryComponent
    }]
}];
