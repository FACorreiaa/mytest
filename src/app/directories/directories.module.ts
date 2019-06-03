import { NgModule } from '@angular/core'

import { GoogleComponent } from './google/containers/google.container'
import { CoreModule } from '@app/core/core.module'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [CoreModule],
  exports: [],
  declarations: [GoogleComponent],
  providers: [],
})
export class DirectoriesModule {}
