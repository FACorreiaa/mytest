import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { FormGroup, FormBuilder } from '@angular/forms'
import { MatDialog } from '@angular/material'

import * as fromMain from '../../main.selectors'

import { BusinessData } from '@app/api/models/api-models'
import { Store } from '@ngrx/store'

import { DeleteAccComponent } from '@app/main/components/delete-acc/delete-acc.component'
import { ISubscription } from 'rxjs/Subscription'

@Component({
    selector: 'acc-management',
    templateUrl: 'acc-management.component.html',
    styleUrls: ['./acc-management.component.scss'],
})
export class AccManagementComponent implements OnInit, OnDestroy {
    private subscription: ISubscription

    profileData: Observable<BusinessData[]>

    firstName: string
    lastName: string
    email: string
    countryCode: string
    languageCode: string

    userFormGroup: FormGroup

    constructor(
        private store: Store<fromMain.MainState>,
        private formBuilder: FormBuilder,
        public dialog: MatDialog
    ) {
        this.profileData = this.store.select(fromMain.getProfileBusinessList)
    }

    ngOnInit() {
        this.subscription = this.profileData.subscribe((settingsData: BusinessData[]) => {
            this.firstName = settingsData[0].userFirstName
            this.lastName = settingsData[0].userLastName
            this.email = settingsData[0].contactEmail
            this.countryCode = settingsData[0].countryCode
            this.languageCode = settingsData[0].languageCode
        })

        this.userFormGroup = this.formBuilder.group({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        })
        this.userFormGroup.disable()
    }

    openDeleteAcc() {
        this.dialog.open(DeleteAccComponent)
    }

    gotoDish() {
        window.open('https://www.dish.co/' + this.countryCode + '/' + this.languageCode + '/user/profile/')
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
