import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './containers/dashboard.component'

const DashBoardRoutes: Routes = [{ path: '', component: DashboardComponent, children: [] }]

@NgModule({
  imports: [RouterModule.forChild(DashBoardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
