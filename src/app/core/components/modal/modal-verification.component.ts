import { Component, OnInit, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'cs-modal',
  templateUrl: 'modal-verification.component.html',
  styleUrls: ['./modal-verification.component.scss'],
})
export class ModalVerificationComponent implements OnInit {
  IsSelectVerification: boolean
  IsTypeCode: boolean
  IsProcessing: boolean
  @Input() public header: ''

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.IsProcessing = true
  }

  closeModal() {
    this.activeModal.close()
  }

  verificationsMethods(event: Event) {
    this.IsSelectVerification = true
    this.IsTypeCode = false
    this.IsProcessing = false
  }
}
