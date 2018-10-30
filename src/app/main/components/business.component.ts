import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'business-card',
  templateUrl: 'business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinnessComponent implements OnInit, OnChanges {
  @Input() buninessData$: Observable<any[]>
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('business', this.buninessData$)
  }
}
