import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input } from '@angular/core'
import { BusinessUnitCompleteness, BusinessData } from '@app/api/models/api-models'
import { ProfileCompletenessService } from '@app/api/services/core/profile-completeness.service'

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnInit {
  incomplete: string[]
  completeness: number
  toComplete: number

  businessUnit: BusinessUnitCompleteness[]
  establishmentId: string
  selectedBusiness: BusinessData

  @Input() businessData$: BusinessData[]

  constructor(private profileCompletenessService: ProfileCompletenessService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    /*
    this.selectedBusiness = this.businessData$[this.businessData$.length - 1]
    this.establishmentId = this.selectedBusiness.establishmentId
    */
    this.profileCompletenessService.businessUnitCompleteness('22').subscribe((profileCompleteness: BusinessUnitCompleteness) => {
      this.incomplete = profileCompleteness.incomplete
      this.completeness = profileCompleteness.completeness
      this.toComplete = 100 - this.completeness

      this.cdr.markForCheck()
    })
  }
}
