import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppAuthGuard } from './app.authguard'

// ROUTING
export const AppRoutes = {
  MAIN: 'main/dashboard',
  NEW: 'main/new',
  WIZARD: 'wizard',
  ERROR: 'error',
}

const Paths: Routes = [{ path: '', canActivate: [AppAuthGuard], loadChildren: './auth/auth.module#AuthModule' }]

@NgModule({
  imports: [RouterModule.forRoot(Paths, { useHash: true })],
  exports: [RouterModule],
  providers: [AppAuthGuard],
})
export class AppRoutingModule {}
