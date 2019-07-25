import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core'
import { BusinessUnitCompleteness, BusinessData } from '@app/api/models/api-models'
import { ProfileCompletenessService } from '@app/api/services/core/profile-completeness.service'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnInit, OnChanges, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()

  incomplete: string[]
  completeness: number
  toComplete: number

  bussinesData: BusinessData

  @Input() businessData$: BusinessData[]

  constructor(private profileCompletenessService: ProfileCompletenessService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['businessData$'] && changes['businessData$'].currentValue[0]) {
      this.bussinesData = changes['businessData$'].currentValue[0]
      this.subscribeTobusinessUnitCompleteness(this.bussinesData.establishmentId)
    }
  }

  private subscribeTobusinessUnitCompleteness(establishmentId: string) {
    this.profileCompletenessService
      .businessUnitCompleteness(establishmentId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((profileCompleteness: BusinessUnitCompleteness) => {
        this.incomplete = profileCompleteness.incomplete
        this.completeness = profileCompleteness.completeness
        this.toComplete = Math.floor(100 - this.completeness)

        this.cdr.markForCheck()
      })
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
