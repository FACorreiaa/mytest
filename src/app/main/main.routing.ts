import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// COMPONENTS
import { MainComponent } from './main.component'
import { DashboardComponent } from './containers/dashboard.component'
import { BusinessDetailComponent } from './containers/business-detail.component'

const MainRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'business-detail/detail/:objId',
        component: BusinessDetailComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(MainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
