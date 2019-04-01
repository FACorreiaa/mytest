import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard.routing'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { DashBoardEffects } from '@app/main/store/effects/dashboard.effects'

import { reducers, reducerName } from './dashboard.reducer'

@NgModule({
  imports: [DashboardRoutingModule, StoreModule.forFeature(reducerName, reducers), EffectsModule.forFeature([DashBoardEffects])],
  exports: [RouterModule],
  declarations: [DashboardComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
