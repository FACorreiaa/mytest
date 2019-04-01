import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// COMPONENTS
import { MainComponent } from './main.component'
import { AddBusinessComponent } from './containers/add-business.component'
import { BusinessDetailComponent } from './containers/business-detail.component'
import { DashboardComponent } from '@app/features/dashboard/dashboard.component'
// import { DashboardComponent } from './containers/dashboard.component'

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
      // {
      //   path: 'new',
      //   component: AddBusinessComponent,
      // },
      // {
      //   path: 'business-detail/detail/:objId',
      //   component: BusinessDetailComponent,
      // },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(MainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
