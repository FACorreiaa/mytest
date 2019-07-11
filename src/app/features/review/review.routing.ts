import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ReviewComponent } from './containers/review.component'

const ReviewRoutes: Routes = [{ path: '', component: ReviewComponent, children: [] }]

@NgModule({
  imports: [RouterModule.forChild(ReviewRoutes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
