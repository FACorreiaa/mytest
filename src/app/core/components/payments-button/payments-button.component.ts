import { Component, OnInit, Input } from '@angular/core'
import { ICategory } from '@app/api/models/api-models'

@Component({
  selector: 'payments-button',
  templateUrl: 'payments-button.component.html',
  styleUrls: ['./payments-button.component.scss'],
})
export class PaymentsButtonComponent implements OnInit {
  @Input() payments: ICategory[]

  toggleState: boolean[]
  paymentState: { [key: string]: boolean }

  constructor() {
    this.paymentState = {}
    this.toggleState = []
  }

  ngOnInit() {
    this.toggleState = this.payments.map(() => false)
    this.payments.forEach((payment: ICategory) => {
      this.paymentState[payment.name] = false
    })
  }

  togglePayments(index: number) {
    const current = this.toggleState
    this.toggleState = this.toggleState.map(() => false)
    this.toggleState[index] = !current
  }

  /**
   * When users check/unckeck some payments.
   * @param event click event
   * @param payment payment selected
   */
  onPaymentsChange(event, payment: string) {
    this.paymentState[payment] = !this.paymentState[payment]
  }
}
