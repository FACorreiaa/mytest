import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'
import { AppAuthGuard } from './app.authguard'
import { GoogleComponent } from './directories/google/containers/google.container'

// ROUTING
export const AppRoutes = {
  MAIN: 'main/dashboard',
  WIZARD: 'main/wizard',
  ERROR: 'error',
}

const Paths: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  // { path: '', canActivate: [AppAuthGuard], loadChildren: './auth/auth.module#AuthModule' },
  // { path: '', canActivate: [AppAuthGuard], loadChildren: './main/main.module#MainModule' },
  { path: 'main', canActivate: [AppAuthGuard], loadChildren: './main/main.module#MainModule' },
  { path: 'google', component: GoogleComponent },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(Paths, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: [AppAuthGuard],
})
export class AppRoutingModule { }
