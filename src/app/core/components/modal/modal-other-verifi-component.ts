import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'cs-modal-other',
  templateUrl: 'modal-other-verifi-component.html',
  styleUrls: ['./modal-other-verifi-component.scss'],
})
export class ModalOtherVerifiComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter()
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  emailRequest(): void {
    this.passEntry.emit('email')
  }
}
