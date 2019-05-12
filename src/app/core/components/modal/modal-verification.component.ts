import { Component, OnInit, Input } from '@angular/core'
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import { ModalOtherVerifiComponent } from './modal-other-verifi-component'

@Component({
  selector: 'cs-modal',
  templateUrl: 'modal-verification.component.html',
  styleUrls: ['./modal-verification.component.scss'],
})
export class ModalVerificationComponent implements OnInit {
  IsSelectVerification: boolean
  IsTypeCode: boolean
  IsProcessing: boolean
  IsSuccess: boolean

  @Input() public header: ''

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  ngOnInit() {
    this.IsSelectVerification = true
  }

  closeModal() {
    this.activeModal.close()
  }

  open() {
    const options: NgbModalOptions = {
      centered: true,
      size: 'lg',
    }

    const modalRef = this.modalService.open(ModalOtherVerifiComponent, options)

    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      // console.log(receivedEntry)

      modalRef.close()
      this.inProcess()
    })
  }

  verificationsMethods(event: Event) {
    this.IsSelectVerification = true
    this.IsTypeCode = false
    this.IsProcessing = false
  }

  inProcess() {
    this.IsSelectVerification = false
    this.IsProcessing = true

    setTimeout(
      function() {
        this.IsTypeCode = true
        this.IsProcessing = false
      }.bind(this),
      2000
    )
  }

  confirmCode() {
    this.IsTypeCode = false
    this.IsSuccess = true
  }
}
