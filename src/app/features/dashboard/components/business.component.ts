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
  gmbUrl: string
  gSearchUrl: string
  gMapsUrl: string

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.listingStatus = false
    this.gmbUrl = 'https://www.google.com/intl/de_de/business/'
    this.gSearchUrl = 'https://www.google.de/'
    this.gMapsUrl = 'https://www.google.de/maps?hl=de&tab=wl'
  }

  setStatus() {
    this.listingStatus = this.listingStatus = !this.listingStatus
    if (this.listingStatus) {
      window.open(this.gmbUrl, '_blank')
    }
  }

  googleSearch() {
    window.open(this.gSearchUrl, '_blank')
  }

  googleMaps() {
    window.open(this.gMapsUrl, '_blank')
  }

  open() {
    const options: NgbModalOptions = {
      centered: true,
      size: 'lg',
    }

    const modalRef = this.modalService.open(ModalVerificationComponent, options)
    // modalRef.componentInstance.body = '<div>asdas<div>'
  }

  ngOnChanges() { }
}
