import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
    // homepage redirects to registration
        path: '',
        redirectTo: 'register',
        pathMatch: 'full',
    },{
        path: '',
        component: AdminLayoutComponent,
        // canActivate: [ NeedsLoginGuardService ]
        children: [{
            path: 'dashboard',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        },{
            path: 'components',
            loadChildren: './components/components.module#ComponentsModule'
        }]
        },{
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: '',
                loadChildren: './pages/pages.module#PagesModule'
            }]
        }
];
