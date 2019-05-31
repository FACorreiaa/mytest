import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './main.component'
import { AppAuthGuard } from '@app/app.authguard'

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
      // {
      //   path: 'wizard',
      //   // canActivate: [AppAuthGuard],
      //   loadChildren: '../auth/auth.module#AuthModule',
      // },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(MainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
