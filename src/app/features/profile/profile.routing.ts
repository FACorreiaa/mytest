import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProfileComponent } from './containers/profile.component'

const MainRoutes: Routes = [{ path: '', component: ProfileComponent, children: [] }]

@NgModule({
  imports: [RouterModule.forChild(MainRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
