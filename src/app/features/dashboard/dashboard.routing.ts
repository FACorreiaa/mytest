import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard.component'

const MainRoutes: Routes = [{ path: '', component: DashboardComponent, children: [] }]

@NgModule({
  imports: [RouterModule.forChild(MainRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
