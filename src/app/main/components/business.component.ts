import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'business-card',
  templateUrl: 'business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinnessComponent implements OnInit, OnChanges {
  @Input() buninessData$: Observable<any[]>
  @Output() private editBusinessEvent = new EventEmitter()

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('business', this.buninessData$)
  }

  EditBusiness(event, businessId) {
    this.editBusinessEvent.emit(businessId)

    // console.log('Edit', event, businessId)
    // this.router.navigate(['../business-detail/detail'], { relativeTo: this.route })
  }

  RemoveBusiness(event, business) {
    console.log('Remove', event, business)
  }
}
