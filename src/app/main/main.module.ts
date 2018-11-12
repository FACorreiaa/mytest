import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

// CONTAINERS
import { MainComponent } from './main.component'
import { DashboardComponent } from './containers/dashboard.component'
import { BusinnessComponent } from './components/business.component'
import { BusinessDetailComponent } from './containers/business-detail.component'
import { AddBusinessComponent } from './containers/add-business.component'

// EFFECTS

import { reducers, reducerName } from './main.reducers'
import { MainRoutingModule } from './main.routing'
import { DashBoardEffects } from './store/effects/dashboard.effects'
import { MaterialModule } from '@app/material.module'
import { CsStepperModule } from '@app/common/components/cs-stepper.module'

@NgModule({
  imports: [
    StoreModule.forFeature(reducerName, reducers),
    MainRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CsStepperModule,
    EffectsModule.forFeature([DashBoardEffects]),
  ],
  declarations: [MainComponent, DashboardComponent, BusinnessComponent, BusinessDetailComponent, AddBusinessComponent],
  exports: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}
