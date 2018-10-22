import { MatDialogRef } from '@angular/material'
import { Component } from '@angular/core'

@Component({
  selector: 'app-model',
  templateUrl: 'model-term-conditions.html',
})
export class ModalTermsConditionsComponent {
  constructor(public dialogRef: MatDialogRef<ModalTermsConditionsComponent>) {}

  onTCClick(): void {
    this.dialogRef.close()
  }
}
