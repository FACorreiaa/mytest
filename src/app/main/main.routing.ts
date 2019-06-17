import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './main.component'
import { AppAuthGuard } from '@app/app.authguard'
import { TermsConditionsComponent } from './containers/terms-conditions.component'
import { ImprintComponent } from './components/imprint/imprint.component'
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component'

const MainRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AppAuthGuard],
        loadChildren: '../features/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'profile',
        canActivate: [AppAuthGuard],
        loadChildren: '../features/profile/profile.module#ProfileModule',
      },
      {
        path: 'wizard',
        canActivate: [AppAuthGuard],
        loadChildren: '../auth/auth.module#AuthModule',
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
        path: 'data_privacy',
        canActivate: [AppAuthGuard],
        component: DataPrivacyComponent,
      }
    ],
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(MainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
