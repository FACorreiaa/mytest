import { RouterModule } from '@angular/router'
import { AppRoutes } from '@app/app.routing'
import { WizardComponent } from './containers/wizard.component'
import { ErrorComponent } from './containers/error.component'
import { NgxPermissionsGuard } from 'ngx-permissions'
import { AppAuthGuard } from '@app/app.authguard'
import { NgModule } from '@angular/core'

// Routing
const AuthRoutes = [
  {
    path: '',
    component: WizardComponent,
    canActivate: [AppAuthGuard],
  },
  {
    path: AppRoutes.ERROR,
    component: ErrorComponent,
    // ToDo - example in how to use ngx permissions
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
