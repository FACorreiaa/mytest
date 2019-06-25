import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'delete-acc',
    templateUrl: 'delete-acc.component.html',
    styleUrls: ['./delete-acc.component.scss'],
})
export class DeleteAccComponent implements OnInit {
    deleteFormGroup: FormGroup

    constructor(public dialog: MatDialog) { }

    ngOnInit() { }

    openDeleteConfirm() {
        this.dialog.open(DeleteConfirmComponent)
    }
}
