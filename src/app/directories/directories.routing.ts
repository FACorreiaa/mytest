import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'
import { GoogleComponent } from './google/containers/google.container'
import { FinishComponent } from './google/containers/finish.container'

const Paths: Routes = [
  { path: '', redirectTo: 'google', pathMatch: 'full' },
  { path: 'finish', component: FinishComponent },
  {
    path: '',
    component: GoogleComponent,
    children: [
      {
        path: 'finish',
        component: FinishComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(Paths)],
  exports: [RouterModule],
  providers: [],
})
export class DirectoriesRoutingModule {}
