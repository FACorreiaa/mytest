import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WizardComponent } from './auth/containers/wizard.component'

// ROUTING
export const AppRoutes = {
  LOGIN: 'login',
  MAIN: 'main/dashboard',
  WIZARD: 'wizard',
}

const Paths: Routes = [{ path: '', redirectTo: 'wizard', pathMatch: 'full' }, { path: '', loadChildren: './auth/auth.module#AuthModule' }]

@NgModule({
  imports: [RouterModule.forRoot(Paths)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
