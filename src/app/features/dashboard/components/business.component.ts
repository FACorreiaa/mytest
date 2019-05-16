import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core'
import { NgbModal, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import {
  BusinessData,
  FetchVerificationResponse,
  VerificationOptions,
  OptionsVerificationType,
  InitVerificationRequest,
  InitVerificationEvent,
  EmailData,
  CompleteVerificationEvent,
  CompleteVerificationRequest,
} from '@app/api/models/api-models'
import { ModalOtherVerifiComponent } from '@app/core/components/modal/modal-other-verifi-component'

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
  @Output() InitializeVerificationEvent: EventEmitter<any> = new EventEmitter()
  @Output() CompleteVerificationEvent: EventEmitter<any> = new EventEmitter()

  @ViewChild('content') _templateModal: ElementRef

  hasEmailOption: boolean
  hasPhoneOption: boolean
  hasSMSOption: boolean
  hasAddressOption: boolean
  listingStatus: boolean

  IsSelectVerification: boolean
  IsInsertCode: boolean
  IsProcessing: boolean
  IsSuccess: boolean

  gmbUrl: string
  gSearchUrl: string
  gMapsUrl: string
  selectedBusiness: BusinessData
  verificationOptions: VerificationOptions[]

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.IsSelectVerification = true
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
      this.verificationOptions = this.fecthOptions$.options.options

      // console.log('OnChanges', this.verificationOptions)

      this.verificationOptions.map(item => {
        if (item.verificationMethod === OptionsVerificationType.ADDRESS) {
          this.hasAddressOption = true
        } else if (item.verificationMethod === OptionsVerificationType.EMAIL) {
          this.hasEmailOption = true
        } else if (item.verificationMethod === OptionsVerificationType.PHONE_CALL) {
          this.hasPhoneOption = true
        } else if (item.verificationMethod === OptionsVerificationType.SMS) {
          this.hasSMSOption = true
        }
      })
    }
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

  closeModal() {
    this.modalService.dismissAll()
    // this.activeModal.close()
  }

  /**
   * Event to open modal with options to verification
   */
  verifyBusiness() {
    this.fetchOptionsEvent.emit(this.selectedBusiness.id)

    const options: NgbModalOptions = {
      centered: true,
      size: 'lg',
    }

    this.modalService.open(this._templateModal, options)
  }

  /**
   * Event to open other verifications options.
   */
  openOtherVerifications() {
    const options: NgbModalOptions = {
      centered: true,
      size: 'lg',
    }

    const modalRef = this.modalService.open(ModalOtherVerifiComponent, options)
    modalRef.componentInstance.hasAddressOption = this.hasAddressOption
    modalRef.componentInstance.hasEmailOption = this.hasEmailOption

    modalRef.componentInstance.inProcessEmail.subscribe((email: string) => {
      modalRef.close()
      this.inProcess(OptionsVerificationType.EMAIL)
    })

    modalRef.componentInstance.inProcessAddress.subscribe((address: string) => {
      modalRef.close()
      this.inProcess(OptionsVerificationType.ADDRESS)
    })
  }

  /**
   * Event to go back on the verifcations options selections.
   */
  verificationsMethods() {
    this.IsSelectVerification = true
    this.IsInsertCode = false
    this.IsProcessing = false
  }

  /**
   * Event that initiates the verifications
   * @param type of the verifications.
   */
  inProcess(type: string) {
    const eventReq = this.buildInitRequest(type)
    this.InitializeVerificationEvent.emit(eventReq)

    this.IsSelectVerification = false
    this.IsProcessing = true

    setTimeout(
      function() {
        this.IsInsertCode = true
        this.IsProcessing = false
      }.bind(this),
      2000
    )
  }

  /**
   * Event to confirm code of verification.
   */
  confirmCode() {
    this.IsInsertCode = false
    this.IsSuccess = true

    const eventReq: CompleteVerificationEvent = {
      id: this.selectedBusiness.id,
      request: { pin: '3443' } as CompleteVerificationRequest,
    }

    this.CompleteVerificationEvent.emit(eventReq)
  }

  /**
   * This mehtod builds the request to initialize the verification.
   * @param type option type selected
   */
  private buildInitRequest(type: string): InitVerificationEvent {
    if (type === OptionsVerificationType.EMAIL) {
      const eventReq: InitVerificationEvent = {
        id: this.selectedBusiness.id,
        request: {
          input: { emailAddress: 'npinha@cocus.com' }, // this.verificationOptions.find(item => item.verificationMethod === OptionsVerificationType.EMAIL).emailData.domainName },
          method: OptionsVerificationType.EMAIL,
          languageCode: 'de',
        } as InitVerificationRequest,
      }

      return eventReq
    } else if (type === OptionsVerificationType.ADDRESS) {
      const eventReq: InitVerificationEvent = {
        id: this.selectedBusiness.id,
        request: {
          input: { mailerContactName: this.verificationOptions.find(item => item.verificationMethod === OptionsVerificationType.ADDRESS).addressData.businessName },
          method: OptionsVerificationType.ADDRESS,
          languageCode: 'de',
        } as InitVerificationRequest,
      }
      return eventReq
    } else if (type === OptionsVerificationType.PHONE_CALL) {
      const eventReq: InitVerificationEvent = {
        id: this.selectedBusiness.id,
        request: {
          input: { phoneNumber: this.verificationOptions.find(item => item.verificationMethod === OptionsVerificationType.PHONE_CALL).phoneData.phoneNumber },
          method: OptionsVerificationType.PHONE_CALL,
          languageCode: 'de',
        } as InitVerificationRequest,
      }
      return eventReq
    } else if (type === OptionsVerificationType.SMS) {
      const eventReq: InitVerificationEvent = {
        id: this.selectedBusiness.id,
        request: {
          input: { phoneNumber: this.verificationOptions.find(item => item.verificationMethod === OptionsVerificationType.SMS).phoneData.phoneNumber },
          method: OptionsVerificationType.SMS,
          languageCode: 'de',
        } as InitVerificationRequest,
      }

      return eventReq
    }
  }
}
