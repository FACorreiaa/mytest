import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material'

import * as fromMain from '../../main.selectors'

import { BusinessData } from '@app/api/models/api-models'
import { Store } from '@ngrx/store'

import { DeleteAccComponent } from '@app/main/components/delete-acc/delete-acc.component'

@Component({
    selector: 'acc-management',
    templateUrl: 'acc-management.component.html',
    styleUrls: ['./acc-management.component.scss'],
})
export class AccManagementComponent implements OnInit {
    profileData: Observable<BusinessData[]>

    userFormGroup: FormGroup

    constructor(
        private store: Store<fromMain.MainState>,
        private formBuilder: FormBuilder,
        public dialog: MatDialog
    ) {
        this.profileData = this.store.select(fromMain.getProfileBusinessList)
    }

    ngOnInit() {
        this.profileData.subscribe((data: BusinessData[]) => {
            this.userFormGroup = this.formBuilder.group({
                firstName: data[0].userFirstName,
                lastName: data[0].userLastName,
                email: data[0].contactEmail
            })
            this.userFormGroup.disable()
        })
    }

    openDeleteAcc() {
        this.dialog.open(DeleteAccComponent)
    }

    gotoDish() {
        window.open('https://www.dish.co/DE/de/user/account')
    }
}
