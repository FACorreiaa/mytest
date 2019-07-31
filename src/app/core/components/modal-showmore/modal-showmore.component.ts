import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Component, Inject, EventEmitter, Output, ChangeDetectorRef, ViewChild, Input } from '@angular/core'
import { CollapsibleButtonComponent } from '../collapsible-button/collapsible-button.component'
import { ICategoryDto } from '@app/api/models/api-models'

@Component({
  selector: 'app-modal-showmore',
  templateUrl: 'modal-showmore.component.html',
  styleUrls: ['./modal-showmore.component.scss'],
})
export class ModalShowmoreComponent {
  show = false

  constructor(public dialogRef: MatDialogRef<ModalShowmoreComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private cdr: ChangeDetectorRef) {}
  /**
   * construct data
   */
  @Input() offeringState: { [key: string]: boolean }
  @Output() toggleState: EventEmitter<any> = new EventEmitter()
  @Output() toggleOfferings: EventEmitter<any> = new EventEmitter()

  ngOnInit() {}

  ngAfterViewInit() {
    this.cdr.detectChanges()
  }

  close(item: string) {
    // always false
    this.dialogRef.close({ data: this.offeringState[item] })
  }

  /**
   * pass data to collapsible-button
   * @param event
   * @param item
   */
  onOfferingsChange(event, item: string) {
    this.offeringState[item] = !this.offeringState[item]
    this.toggleState.emit(this.offeringState)
  }
}
