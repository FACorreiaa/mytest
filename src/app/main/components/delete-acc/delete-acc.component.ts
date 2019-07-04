import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
    selector: 'delete-acc',
    templateUrl: 'delete-acc.component.html',
    styleUrls: ['./delete-acc.component.scss'],
})
export class DeleteAccComponent implements OnInit {
    deleteFormGroup: FormGroup

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

    ngOnInit() {
        this.deleteFormGroup = this.formBuilder.group({
            reason: ['', Validators.required],
            comment: ''
        })
    }

    openDeleteConfirm() {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.data = {
            reason: '',
            comment: ''
        }

        this.dialog.open(DeleteConfirmComponent, dialogConfig)
    }
}
