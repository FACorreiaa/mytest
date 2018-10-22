import { NgModule, CUSTOM_ELEMENTS_SCHEMA, InjectionToken } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// CONTAINERS
import { MainComponent } from './main.component'
import { DashboardComponent } from './containers/dashboard.component'

// EFFECTS

// import { reducers, reducerName } from './main.reducers'
import * as fromApp from '../app.reducers'
import { StoreModule } from '@ngrx/store'
import { MainRoutingModule } from './main.routing'

@NgModule({
  imports: [
    // StoreModule.forFeature(reducerName, reducers),
    MainRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // EffectsModule.forFeature([UserProfileEffects]),
  ],
  declarations: [MainComponent, DashboardComponent],
  exports: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}
