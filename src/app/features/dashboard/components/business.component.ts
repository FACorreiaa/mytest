import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter, AfterViewChecked } from '@angular/core'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { ModalVerificationComponent } from '@app/core/components/modal/modal-verification.component'
import { BusinessData, FetchVerificationResponse } from '@app/api/models/api-models'

@Component({
  selector: 'business-comp',
  templateUrl: 'business.component.html',
  styleUrls: ['./business.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessComponent implements OnInit, OnChanges {
  @Input() businessData$: any[]
  @Input() fecthOptions$: FetchVerificationResponse

  @Output() fetchOptionsEvent: EventEmitter<any> = new EventEmitter()

  hasEmailOption: boolean
  hasPhoneOption: boolean
  hasSMSOption: boolean
  hasAddressOption: boolean
  listingStatus: boolean
  gmbUrl: string
  gSearchUrl: string
  gMapsUrl: string
  selectedBusiness: BusinessData
  fetchOptions: any[]

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.listingStatus = false
    this.gmbUrl = 'https://www.google.com/intl/de_de/business/'
    this.gSearchUrl = 'https://www.google.de/'
    this.gMapsUrl = 'https://www.google.de/maps?hl=de&tab=wl'
  }

  ngOnChanges() {
    if (this.businessData$[this.businessData$.length - 1]) {
      this.selectedBusiness = this.businessData$[this.businessData$.length - 1]
    }

    if (this.fecthOptions$) {
      this.fetchOptions = this.fecthOptions$.options.options

      if (!this.hasEmailOption) {
        console.log('options', this.fetchOptions)

        // const options: NgbModalOptions = {
        //   centered: true,
        //   size: 'lg',
        // }

        // const modalRef = this.modalService.open(ModalVerificationComponent, options)
        // modalRef.componentInstance.fecthOptions$ = this.fetchOptions
      }
      this.hasEmailOption = true
    }
  }

  // ngAfterViewChecked() {
  //   if (this.fetchOptions) {
  //     console.log('ngAfterViewChecked')

  //     // this.modalService.dismissAll()

  //     // const options: NgbModalOptions = {
  //     //   centered: true,
  //     //   size: 'lg',
  //     // }

  //     // const modalRef = this.modalService.open(ModalVerificationComponent, options)
  //     // modalRef.componentInstance.fecthOptions$ = this.fetchOptions
  //   }
  // }

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

  verify() {
    this.fetchOptionsEvent.emit(this.selectedBusiness.id)

    const options: NgbModalOptions = {
      centered: true,
      size: 'lg',
    }

    const modalRef = this.modalService.open(ModalVerificationComponent, options)
    // modalRef.componentInstance.fecthOptions$ = this.selectedBusiness
  }
}
