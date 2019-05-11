import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { ModalVerificationComponent } from '@app/core/components/modal/modal-verification.component'

@Component({
  selector: 'business-comp',
  templateUrl: 'business.component.html',
  styleUrls: ['./business.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessComponent implements OnInit, OnChanges {
  @Input() businessData$: Observable<any[]>
  listingStatus: boolean

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.listingStatus = false
  }

  setStatus() {
    this.listingStatus = this.listingStatus = !this.listingStatus
  }

  ngOnChanges() {
    // console.log('testeee', this.businessData$)
  }

  open() {
    const options: NgbModalOptions = {
      centered: true,
      size: 'lg',
    }

    const modalRef = this.modalService.open(ModalVerificationComponent, options)
    // modalRef.componentInstance.body = '<div>asdas<div>'
  }
}
