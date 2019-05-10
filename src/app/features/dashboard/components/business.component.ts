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

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    // console.log('testeee', this.businessData$)
  }
}
