import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material'
import { ModalTermsConditionsComponent } from '@app/common/components/model-term-conditions'

@Component({
  selector: 'business-card',
  templateUrl: 'business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinnessComponent implements OnInit, OnChanges {
  @Input() buninessData$: Observable<any[]>
  @Output() private editBusinessEvent = new EventEmitter()
  @Output() private deleteBusinessEvent = new EventEmitter()

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('business', this.buninessData$)
  }

  EditBusiness(event, business) {
    this.editBusinessEvent.emit(business)
  }

  RemoveBusiness(event, business) {
    const ref = this.dialog.open(ModalTermsConditionsComponent, { data: { isDelete: true }, width: '550px' })
    const sub = ref.componentInstance.onDelete.subscribe(() => {
      console.log('delete')
      this.deleteBusinessEvent.emit(business)
    })
  }
}
