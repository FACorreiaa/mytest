import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'
import { AppAuthGuard } from './app.authguard'

// ROUTING
export const AppRoutes = {
  MAIN: 'main/dashboard',
  NEW: 'main/new',
  WIZARD: 'wizard',
  ERROR: 'error',
}

const Paths: Routes = [
  { path: '', canActivate: [AppAuthGuard], loadChildren: './auth/auth.module#AuthModule' },
  { path: 'main', canActivate: [AppAuthGuard], loadChildren: './main/main.module#MainModule' },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(Paths, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: [AppAuthGuard],
})
export class AppRoutingModule {}
