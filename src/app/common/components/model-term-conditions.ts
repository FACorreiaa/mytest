import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Component, Inject, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-model',
  templateUrl: 'model-term-conditions.html',
  styleUrls: ['./model-term-conditions.scss'],
})
export class ModalTermsConditionsComponent {
  isDelete = false
  isOffersValidation = false
  onDelete = new EventEmitter()

  constructor(public dialogRef: MatDialogRef<ModalTermsConditionsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onTCClick(): void {
    this.dialogRef.close()
  }

  onDeleteClick(): void {
    this.onDelete.emit()
    this.dialogRef.close()
  }
}
