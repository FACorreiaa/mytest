import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { GoogleComponent } from './google/containers/google.container'
import { CoreModule } from '@app/core/core.module'
import { FinishComponent } from './google/containers/finish.container'

import { reducers, reducerName } from './directories.selector'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DirectoriesRoutingModule } from './directories.routing'
import { EffectsModule } from '@ngrx/effects'
import { GoogleEffects } from './google/store/google.effects'
import { RouterModule } from '@angular/router'
import { StartOauthComponent } from './google/components/start-oauth.component'
import { FinishOauthComponent } from './google/components/finish-oauth.component'

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(reducerName, reducers),
    EffectsModule.forFeature([GoogleEffects]),
    DirectoriesRoutingModule,
  ],
  exports: [RouterModule],
  declarations: [GoogleComponent, FinishComponent, StartOauthComponent, FinishOauthComponent],
  providers: [],
})
export class DirectoriesModule {}
