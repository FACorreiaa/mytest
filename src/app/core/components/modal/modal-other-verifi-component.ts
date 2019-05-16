import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { OptionsVerificationType } from '@app/api/models/api-models'

@Component({
  selector: 'cs-modal-other',
  templateUrl: 'modal-other-verifi-component.html',
  styleUrls: ['./modal-other-verifi-component.scss'],
})
export class ModalOtherVerifiComponent implements OnInit {
  @Input() hasEmailOption: boolean
  @Input() hasAddressOption: boolean

  @Output() inProcessEmail: EventEmitter<any> = new EventEmitter()
  @Output() inProcessAddress: EventEmitter<any> = new EventEmitter()

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  emailRequest(): void {
    this.inProcessEmail.emit(OptionsVerificationType.EMAIL)
  }

  addressRequest(): void {
    this.inProcessAddress.emit(OptionsVerificationType.ADDRESS)
  }
}
