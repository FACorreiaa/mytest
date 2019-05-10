import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'business-comp',
  templateUrl: 'business.component.html',
  styleUrls: ['./business.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessComponent implements OnInit, OnChanges {
  @Input() businessData$: Observable<any[]>

  listingStatus: boolean

  constructor() { }

  ngOnInit() {
    this.listingStatus = false
  }

  setStatus() {
    this.listingStatus = this.listingStatus = !this.listingStatus
  }

  ngOnChanges() {
    // console.log('testeee', this.businessData$)
  }
}
