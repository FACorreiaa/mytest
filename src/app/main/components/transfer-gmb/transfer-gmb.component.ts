import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { SendInviteComponent } from '../send-invite/send-invite.component'
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'

@Component({
  selector: 'transfer-gmb',
  templateUrl: 'transfer-gmb.component.html',
  styleUrls: ['./transfer-gmb.component.scss'],
})
export class TransferGmbComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openInvite() {
    this.dialog.open(SendInviteComponent)
  }

  openError() {
    this.dialog.open(ErrorDialogComponent)
  }
}
