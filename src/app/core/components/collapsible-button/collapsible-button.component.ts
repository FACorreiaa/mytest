import { Component, OnInit, Input } from '@angular/core'
import { ICategoryDto } from '@app/api/models/api-models'
import { MatDialog } from '@angular/material'
import { ModalShowmoreComponent } from '../modal-showmore/modal-showmore.component'

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
  constructor(public dialog: MatDialog) {
    this.offeringState = {}
    this.toggleState = []
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalShowmoreComponent, {
      width: '250px',
      height: '450px',
      data: {
        mockData: [
          'teste 1',
          'teste 2',
          'teste 3',
          'teste 4',
          'teste 5',
          'teste 6',
          'teste 7',
          'teste 8',
          'teste 9',
          'teste 10',
          'teste 11',
          'teste 12',
          'teste 13',
          'teste 14',
          'teste 15',
          'teste 16',
          'teste 17',
          'teste 18',
          'teste 19',
          'teste 20',
        ],
      },
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      console.log(result)
      //this.animal = result;
      data: {
        myData: 'MY VAR'
      }
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

  /**
   * When users check/unckeck some offering.
   * @param event click event
   * @param item offering selected
   */
  onOfferingsChange(event, item: string) {
    this.offeringState[item] = !this.offeringState[item]
  }
}
