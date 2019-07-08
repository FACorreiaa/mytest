import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { Observable } from 'rxjs'

import * as fromMain from '../../main.selectors'

import { BusinessData } from '@app/api/models/api-models'
import { Store } from '@ngrx/store'
import { ISubscription } from 'rxjs/Subscription'

@Component({
  selector: 'delete-confirm',
  templateUrl: 'delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss'],
})
export class DeleteConfirmComponent implements OnInit, OnDestroy {
  private subscription: ISubscription

  profileData: Observable<BusinessData[]>

  deleteConfirmFormGroup: FormGroup
  userEmail: string

  constructor(private formBuilder: FormBuilder, private store: Store<fromMain.MainState>) {
    this.profileData = this.store.select(fromMain.getProfileBusinessList)
  }

  ngOnInit() {
    this.subscription = this.profileData.subscribe((userData: BusinessData[]) => {
      this.userEmail = userData[0].contactEmail
    })
    /*
        this.deleteConfirmFormGroup = this.formBuilder.group({
            email: ['', [Validators.required]]
        }, { validator: this.emailMatchValidator })*/
  }
  /*
    emailMatchValidator(group: FormGroup): any {
        const enteredEmail = group.controls.email.value
        console.log(this.userEmail)
        return enteredEmail === this.userEmail ? null : { emailMatch: true }
    }
    */
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
