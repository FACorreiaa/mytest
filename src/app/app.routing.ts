import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'
import { AppAuthGuard } from './app.authguard'
import { GoogleComponent } from './directories/google/containers/google.container'
import { FinishComponent } from './directories/google/containers/finish.container'

// ROUTING
export const AppRoutes = {
  MAIN: 'main/dashboard',
  WIZARD: 'main/wizard',
  TERMS: 'main/terms',
  ERROR: 'error',
}

const Paths: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', canActivate: [AppAuthGuard], loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'google', loadChildren: () => import('./directories/directories.module').then(m => m.DirectoriesModule) },
  // { path: 'google/finish', component: FinishComponent },
  { path: '**', redirectTo: 'main' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(Paths, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
  providers: [AppAuthGuard],
})
export class AppRoutingModule {}
