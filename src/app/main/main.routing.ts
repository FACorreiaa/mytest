import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './main.component'
import { AppAuthGuard } from '@app/app.authguard'
import { TermsConditionsComponent } from './containers/terms-conditions.component'
import { ImprintComponent } from './components/imprint/imprint.component'
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component'
import { AccManagementComponent } from './containers/acc-management/acc-management.component'
import { StatusLogComponent } from './containers/status-log/status-log.component'

const MainRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AppAuthGuard],
        loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'profile',
        canActivate: [AppAuthGuard],
        loadChildren: () => import('../features/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'review',
        canActivate: [AppAuthGuard],
        loadChildren: () => import('../features/review/review.module').then(m => m.ReviewModule),
      },
      {
        path: 'wizard',
        canActivate: [AppAuthGuard],
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'terms',
        canActivate: [AppAuthGuard],
        component: TermsConditionsComponent,
      },
      {
        path: 'imprint',
        canActivate: [AppAuthGuard],
        component: ImprintComponent,
      },
      {
        path: 'privacy',
        canActivate: [AppAuthGuard],
        component: DataPrivacyComponent,
      },
      {
        path: 'acc_settings',
        canActivate: [AppAuthGuard],
        component: AccManagementComponent,
      },
      {
        path: 'status_log',
        canActivate: [AppAuthGuard],
        component: StatusLogComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(MainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
