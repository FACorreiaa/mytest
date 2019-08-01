import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core'
import { ICategoryDto } from '@app/api/models/api-models'
import { MatDialog } from '@angular/material'
import { ModalShowmoreComponent } from '../modal-showmore/modal-showmore.component'
import { X } from '@angular/cdk/keycodes'

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
  show = false
  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) {
    this.offeringState = {}
    this.toggleState = []
  }
  openDialog(index: number, item: string): void {
    const dialogRef = this.dialog.open(ModalShowmoreComponent, {
      width: '250px',
      height: '400px',
      data: {
        dataKey: this.offerings[index],
        checked: this.offeringState[item],
      },
    })

    //pass data from modal-showmore
    dialogRef.componentInstance.offeringState = this.offeringState
    dialogRef.componentInstance.toggleState.subscribe((item: any) => {
      const itemAux = JSON.stringify(item)
      this.offeringState[item]
    })
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

  filterOfferingsArray(offeringValue) {
    return window.screen.width > 575 ? offeringValue : offeringValue.slice(0, 10)
  }

  /**
   * When users check/unckeck some offering.
   * @param event click event
   * @param item offering selected
   */
  onOfferingsChange(event, item: string) {
    this.offeringState[item] = !this.offeringState[item]
  }

  ngAfterViewInit() {
    this.cdr.detectChanges()
  }
}
