import { Component, OnInit, Input } from '@angular/core'
import { ICategoryDto } from '@app/api/models/api-models'

@Component({
  selector: 'collapsible-button',
  templateUrl: 'collapsible-button.component.html',
  styleUrls: ['./collapsible-button.component.scss'],
})
export class CollapsibleButtonComponent implements OnInit {
  @Input() offerings: ICategoryDto[]

  imgPathOfferings = '../../../../assets/images/icons_offerings/'
  toggleState: boolean[]
  offeringState: { [key: string]: boolean }

  constructor() {
    this.offeringState = {}
    this.toggleState = []
  }

  ngOnInit() {
    this.toggleState = this.offerings.map(() => false)
    this.offerings.forEach((offering: ICategoryDto) => {
      offering.value.forEach((offeringValue: string) => {
        this.offeringState[offeringValue] = false
      })
    })
  }

  toggleOfferings(index: number) {
    const current = this.toggleState[index]
    this.toggleState = this.toggleState.map(() => false)
    this.toggleState[index] = !current
  }

  /**
   * When users check/unckeck some offering.
   * @param event click event
   * @param item offering selected
   */
  onOfferingsChange(event, item: string) {
    this.offeringState[item] = !this.offeringState[item]
  }
}
