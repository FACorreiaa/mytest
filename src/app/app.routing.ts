import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WizardComponent } from './auth/containers/wizard.component'

// ROUTING
export const AppRoutes = {
  LOGIN: 'login',
  MAIN: 'main/dashboard',
  NEW: 'main/new',
  WIZARD: 'wizard',
  ERROR: 'error',
}

const Paths: Routes = [{ path: '', redirectTo: 'wizard', pathMatch: 'full' }, { path: '', loadChildren: './auth/auth.module#AuthModule' }]

@NgModule({
  imports: [RouterModule.forRoot(Paths, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
