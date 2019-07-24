import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Component, Inject, EventEmitter } from '@angular/core'
import { CollapsibleButtonComponent } from '../collapsible-button/collapsible-button.component'

@Component({
  selector: 'app-modal-showmore',
  templateUrl: 'modal-showmore.component.html',
  styleUrls: ['./modal-showmore.component.scss'],
})
export class ModalShowmoreComponent {
  constructor(public dialogRef: MatDialogRef<ModalShowmoreComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  //construct data

  ngOnInit() {}

  save() {
    //data things
    //pass data
  }

  close() {
    this.dialogRef.close()
  }
}
