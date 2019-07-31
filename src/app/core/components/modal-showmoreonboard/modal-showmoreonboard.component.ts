import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Component, Inject, EventEmitter, Output, ChangeDetectorRef, Input } from '@angular/core'
import { CollapsibleButtonComponent } from '../collapsible-button/collapsible-button.component'
import { ICategory } from '@app/api/models/api-models'

@Component({
  selector: 'app-modal-showmoreonboard',
  templateUrl: 'modal-showmoreonboard.component.html',
  styleUrls: ['./modal-showmoreonboard.component.scss'],
})
export class ModalShowmoreonboardComponent {
  constructor(public dialogRef: MatDialogRef<ModalShowmoreonboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private cdr: ChangeDetectorRef) {}

  @Output() notify: EventEmitter<any> = new EventEmitter()
  @Input() offeringsArray: ICategory[] = []
  ngOnInit() {}

  ngAfterViewInit() {
    this.cdr.detectChanges()
  }

  close(item: string) {
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
