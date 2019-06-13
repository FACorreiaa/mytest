import { NgModule } from '@angular/core'

import { GoogleComponent } from './google/containers/google.container'
import { CoreModule } from '@app/core/core.module'
import { FinishComponent } from './google/containers/finish.container'

@NgModule({
  imports: [CoreModule],
  exports: [],
  declarations: [GoogleComponent, FinishComponent],
  providers: [],
})
export class DirectoriesModule {}
