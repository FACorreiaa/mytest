import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Component, Inject, EventEmitter, Output, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core'
import { ICategory } from '@app/api/models/api-models'

@Component({
  selector: 'app-modal-showmoreonboard',
  templateUrl: 'modal-showmoreonboard.component.html',
  styleUrls: ['./modal-showmoreonboard.component.scss'],
})
export class ModalShowmoreonboardComponent implements AfterViewInit {
  @Input() offeringsArray: ICategory[] = []
  @Output() notify: EventEmitter<any> = new EventEmitter()

  constructor(public dialogRef: MatDialogRef<ModalShowmoreonboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges()
  }

  close() {
    this.dialogRef.close({ data: this.offeringsArray })
  }

  /**
   * Pass data to stepper parent
   * @param event
   * @param item
   */
  onOfferingsChange(event, item) {
    this.notify.emit(item)
    item.selected = !item.selected
    this.notify.emit(this.offeringsArray.map(o => o.selected === true))
  }
}
