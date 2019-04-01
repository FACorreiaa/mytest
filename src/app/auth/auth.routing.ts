import { RouterModule } from '@angular/router'
import { AppRoutes } from '@app/app.routing'
import { WizardComponent } from './containers/wizard.component'
import { ErrorComponent } from './containers/error.component'
import { NgxPermissionsGuard } from 'ngx-permissions'
import { AppAuthGuard } from '@app/app.authguard'
import { NgModule } from '@angular/core'

// Routing
const AuthRoutes = [
  { path: '', redirectTo: AppRoutes.WIZARD, pathMatch: 'full' },
  { path: AppRoutes.WIZARD, component: WizardComponent },
  {
    path: AppRoutes.ERROR,
    component: ErrorComponent,
    //// ToDO - example in how to use ngx permissions
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['manage-account'],
      },
    },
  },
  { path: 'main', canActivate: [AppAuthGuard], loadChildren: '../main/main.module#MainModule' },
  { path: '**', redirectTo: 'PageNotFoundComponent' },
]

@NgModule({
  imports: [RouterModule.forChild(AuthRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
