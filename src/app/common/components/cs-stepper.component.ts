import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormGroupDirective, NgForm } from '@angular/forms'
import { CustomValidators, ZipCodeValidation, EmailValidation, PasswordValidation } from '@app/common/validations'
import { OpeningTimes, Day, IHours, OpenHoursArray, CategoriesArray, ICategory, UserRegisterDto, UserLoginDto, Data } from '@app/api/models/api-models'

import { CategoriesService } from '../services/categories.service'
import { MatExpansionPanel, ErrorStateMatcher, MatDialog } from '@angular/material'
import { Observable } from 'rxjs'
import { ModalTermsConditionsComponent } from '@app/common/components/model-term-conditions'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.touched && control.parent.dirty)
    const invalidParent = !!(control && control.parent && control.parent.touched && control.parent.invalid && control.parent.dirty)

    return invalidCtrl || invalidParent
  }
}

@Component({
  selector: 'app-cs-stepper',
  templateUrl: 'cs-stepper.component.html',
  styleUrls: ['./cs-stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsStepperComponent implements OnInit, OnChanges {
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  formConclusion: FormGroup
  matcher = new MyErrorStateMatcher()
  hours: IHours[]
  categories: ICategory[]
  OpenOfferings: boolean
  isRegister = false
  showTermConditiValidation = false
  emailAux = ''

  @Input() authorized
  @Input() offerings: Observable<any>
  @Output() private registerEvent = new EventEmitter()
  @Output() private offeringsEvent = new EventEmitter()
  @Output() private goToProfileEvent = new EventEmitter()

  @ViewChild('expansionPanel') myPanels: MatExpansionPanel

  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService, public dialog: MatDialog) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      location: ['', Validators.required],
      address: ['', Validators.required],
      postal: new FormControl('', ZipCodeValidation),
      city: ['', Validators.required],
      phone: ['', Validators.required],
      area: ['+49', Validators.required],
      country: ['Germany', Validators.required],
      email: [this.emailAux, EmailValidation],
      website: [
        '',
        Validators.compose([
          Validators.required,
          CustomValidators.patternValidator({
            invalidSite: true,
          }),
        ]),
      ],
      openHours: this.formBuilder.array(this.buildOpenHoursArray()),
      interests: this.formBuilder.array([]),
    })

    this.formConclusion = this.formBuilder.group(
      {
        email: [this.emailAux, EmailValidation],
        password: ['', PasswordValidation],
        confirmPassword: ['', PasswordValidation],
        termsConditions: [''],
      },
      {
        validator: passwordMatchValidator,
      }
    )

    this.categories = CategoriesArray()
    this.hours = OpenHoursArray()
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('On changes')
  }

  get openHoursArray(): FormArray {
    return <FormArray>this.firstFormGroup.get('openHours')
  }

  private buildOpenHoursArray(days?: OpeningTimes) {
    const groups = []

    if (!days) {
      groups.push(this.buildOpenDaysInitalFormControl('monday'))
      groups.push(this.buildOpenDaysInitalFormControl('tuesday'))
      groups.push(this.buildOpenDaysInitalFormControl('wednesday'))
      groups.push(this.buildOpenDaysInitalFormControl('thursday'))
      groups.push(this.buildOpenDaysInitalFormControl('friday'))
      groups.push(this.buildOpenDaysInitalFormControl('saturday'))
      groups.push(this.buildOpenDaysInitalFormControl('sunday'))
    }

    return groups
  }

  private buildOpenDaysInitalFormControl(day: string) {
    return this.formBuilder.group({
      name: [day],
      isSelected: [true],
      from: new FormControl({ value: '9', disabled: false }, Validators.required),
      to: ['17'],
      isSplitService: false,
      splitedFrom: [''],
      splitedTo: [''],
    })
  }

  private buildOpenDaysFormControl(day: string, hours: Day[]) {
    return this.formBuilder.group({
      name: [day],
      isSelected: hours.length > 0,
      from: [hours[0].startTime],
      to: [hours[0].endTime],
      isSplitService: hours.length > 1,
      splitedFrom: [hours[1].startTime],
      splitedTo: [hours[1].endTime],
    })
  }

  async onChange(event, item) {
    const interests = (<FormArray>this.firstFormGroup.get('interests')) as FormArray

    this.categories.map(x => {
      x.selected = false
      if (x.name === item.name) {
        x.selected = true
      }
    })

    if (event.checked) {
      interests.removeAt(0)
      interests.push(new FormControl(event.source.value))

      this.offeringsEvent.emit(event.source.value)
    }

    this.myPanels.open()
  }

  GoToProfile() {
    this.goToProfileEvent.emit()
  }

  /**
   * This method save the claim and registration information.
   */
  save(form: FormGroup, formConclusion: FormGroup) {
    console.log('Form data', form.value)
    console.log('User register', formConclusion.value)

    if (!formConclusion.get('termsConditions').value) {
      this.showTermConditiValidation = true

      return null
    }

    const claim = this.createClaimToSave(form.value, formConclusion.value)

    this.registerEvent.emit(claim)
  }

  /**
   * This method creates the objects for the middlware
   */
  private createClaimToSave(form: any, formConclusion: any) {
    const user: UserLoginDto = {
      email: formConclusion.email,
      password: formConclusion.password,
    }

    const claim: Data = {
      businessUnitId: '',
      userFirstName: '',
      userLastName: '',
      name: '',
      additional: form.address,
      street: form.street,
      zipCode: form.postal,
      city: form.city,
      countryCode: '',
      url: form.website,
      contactEmail: form.email,
      contactPhoneNumber: form.phone,
      openingTimes: form.openingTimes,
      specialOpeningTimes: null,
      offerTypes: [],
      description: '',
      imprint: null,
      category: '',
      services: [],
      paymentMethods: [],
      reservationUri: '',
      menuUri: '',
      profileImageUri: '',
      titleImageUri: '',
      stories: null,
    }

    const claimObject: UserRegisterDto = {
      user: user,
      claim: claim,
    }

    return claimObject
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalTermsConditionsComponent, {
      width: '550px',
    })
  }
}

function passwordMatchValidator(formGroup: FormGroup): any {
  const pass = formGroup.controls.password.value
  const confirmPass = formGroup.controls.confirmPassword.value

  if (pass.length < 8 || confirmPass.length < 8) {
    return null
  }
  return pass === confirmPass ? null : { mismatch: true }
}
