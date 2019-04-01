import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { RouterModule } from '@angular/router'
import { ProfileRoutingModule } from './profile.routing'
import { ProfileComponent } from './profile.component'

@NgModule({
  imports: [ProfileRoutingModule],
  exports: [RouterModule],
  declarations: [ProfileComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}
