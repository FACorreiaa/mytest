import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './main.component'

const MainRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../features/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'profile',
        loadChildren: '../features/profile/profile.module#ProfileModule',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(MainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
