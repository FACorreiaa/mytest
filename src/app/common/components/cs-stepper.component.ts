import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormGroupDirective, NgForm } from '@angular/forms'
import { CustomValidators, ZipCodeValidation, EmailValidation, PasswordValidation, PhoneNumberValidation, PhoneNumberPrefixValidation } from '@app/common/validations'
import {
  OpeningTimes,
  Day,
  IHours,
  OpenHoursArray,
  CategoriesArray,
  ICategory,
  UserRegisterDto,
  UserLoginDto,
  Data,
  ManageBusinessData,
  Countries,
} from '@app/api/models/api-models'

import { MatExpansionPanel, ErrorStateMatcher, MatDialog } from '@angular/material'
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
export class CsStepperComponent implements OnInit, OnChanges, AfterViewChecked {
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  thirdFormGroup: FormGroup
  formConclusion: FormGroup
  matcher = new MyErrorStateMatcher()
  hours: IHours[]
  categories: ICategory[]

  OpenOfferings: boolean
  isRegister = false
  showTermConditiValidation = false
  businessEmail = ''
  category = ''
  streetNumber = ''
  selectedOffering: string[] = []
  selectedServices: string[] = []
  selectedPayments: string[] = []
  servicesArray: ICategory[] = []
  paymentsArray: ICategory[] = []
  offeringsArray: ICategory[] = []
  addressFocus = false

  @Input() authorized: any
  @Input() editForm: false
  @Input() newBusiness: false
  @Input() businessToEdit: Data
  @Input() businessToEditId: number
  @Input() business: Data[]
  @Input() offerings: any[]
  @Input() services: any[]
  @Input() payments: any[]
  @Input() countries: Countries[]
  @Output() private registerEvent = new EventEmitter()
  @Output() private editionEvent = new EventEmitter()
  @Output() private goToProfileEvent = new EventEmitter()
  @Output() private getAllOffersEvent = new EventEmitter()

  @ViewChild('expansionPanel') myPanels: MatExpansionPanel
  @ViewChild('address') addressInput: ElementRef

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private change: ChangeDetectorRef) {
    this.buildInitalFormGroup()
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.services && this.services && this.newBusiness) {
      this.services.map(x => this.servicesArray.push({ name: x, selected: false }))
    }

    if (changes.payments && this.payments && this.newBusiness) {
      this.payments.map(x => this.paymentsArray.push({ name: x, selected: false }))
    }
  }

  ngAfterViewChecked() {
    if (this.addressFocus) {
      this.addressInput.nativeElement.focus()
      this.addressFocus = false
    }

    // this.validateCategoriesSelection()

    this.change.detectChanges()
  }

  get openHoursArray(): FormArray {
    return <FormArray>this.secondFormGroup.get('openHours')
  }

  private buildInitalFormGroup() {
    this.firstFormGroup = this.formBuilder.group({
      location: ['', Validators.required],
      address: ['', Validators.required],
      postal: new FormControl('', ZipCodeValidation),
      city: ['', Validators.required],
      phone: ['', PhoneNumberValidation],
      area: ['+49', PhoneNumberPrefixValidation],
      country: ['Germany', Validators.required],
    })

    this.secondFormGroup = this.formBuilder.group({
      email: [this.businessEmail, EmailValidation],
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
    })

    this.thirdFormGroup = this.formBuilder.group({
      hasSelection: ['', Validators.required],
    })

    this.formConclusion = this.formBuilder.group(
      {
        email: [this.businessEmail, EmailValidation],
        password: ['', PasswordValidation],
        confirmPassword: ['', PasswordValidation],
        termsConditions: [''],
      },
      {
        validator: passwordMatchValidator,
      }
    )

    this.categories = CategoriesArray()
    this.categories.map(x => {
      x.selected = false
    })

    this.hours = OpenHoursArray()
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
    } else {
      groups.push(this.buildOpenDaysFormControl(days.monday, 'monday'))
      groups.push(this.buildOpenDaysFormControl(days.tuesday, 'tuesday'))
      groups.push(this.buildOpenDaysFormControl(days.wednesday, 'wednesday'))
      groups.push(this.buildOpenDaysFormControl(days.thursday, 'thursday'))
      groups.push(this.buildOpenDaysFormControl(days.friday, 'friday'))
      groups.push(this.buildOpenDaysFormControl(days.saturday, 'saturday'))
      groups.push(this.buildOpenDaysFormControl(days.sunday, 'sunday'))
    }

    return groups
  }

  private buildOpenDaysInitalFormControl(day: string) {
    return this.formBuilder.group({
      name: [day],
      isSelected: [true],
      from: new FormControl({ value: '9:00', disabled: false }, Validators.required),
      to: ['17:00'],
      isSplitService: false,
      splitedFrom: [''],
      splitedTo: [''],
    })
  }

  private buildOpenDaysFormControl(day: Day[], dayName: string) {
    if (day.length <= 0) {
      return this.formBuilder.group({
        name: [dayName],
        isSelected: [false],
        from: '',
        to: '',
        isSplitService: false,
        splitedFrom: [''],
        splitedTo: [''],
      })
    } else if (day.length > 0) {
      return this.formBuilder.group({
        name: [dayName],
        isSelected: [true],
        from: new FormControl({ value: day[0].startTime, disabled: false }, Validators.required),
        to: new FormControl({ value: day[0].endTime, disabled: false }, Validators.required),
        isSplitService: day.length > 1 ? true : false,
        splitedFrom: day.length > 1 ? [day[1].startTime] : [''],
        splitedTo: day.length > 1 ? [day[1].endTime] : [''],
      })
    }
  }

  async onChangeCategory(event, item) {
    this.categories.map(x => {
      x.selected = false
      if (x.name === item.name) {
        x.selected = true
      }
    })

    this.offeringsArray = []
    if (event.checked) {
      this.category = event.source.value
      this.offerings.filter(x => x.name === item.name)[0].offering.map(x => this.offeringsArray.push({ name: x, selected: false }))
    }

    this.validateCategoriesSelection()

    this.myPanels.open()
  }

  onOfferingsChange(event, item) {
    item.selected = !item.selected

    this.validateCategoriesSelection()
  }

  onServicesChange(event, item) {
    item.selected = !item.selected

    this.validateCategoriesSelection()
  }

  onPaymentsChange(event, item) {
    item.selected = !item.selected

    this.validateCategoriesSelection()
  }

  goToProfile() {
    this.goToProfileEvent.emit()
  }

  /**
   * This method save the claim and registration information.
   */
  save(form: FormGroup, secondFormGroup: FormGroup, formConclusion: FormGroup) {
    if (this.editForm) {
      const businessToEdit = this.editionData(form.value, secondFormGroup.value, formConclusion.value)

      this.editionEvent.emit(businessToEdit)
    } else {
      if (!formConclusion.get('termsConditions').value) {
        this.showTermConditiValidation = true

        return null
      }

      const claim = this.createClaimToSave(form.value, secondFormGroup.value, formConclusion.value)

      this.registerEvent.emit(claim)
    }
  }

  /**
   * This method save the business edition.
   */
  private editionData(firstForm: any, secondFormGroup: any, formConclusion: any) {
    this.offeringsArray.map(off => {
      if (off.selected) {
        this.selectedOffering.push(off.name)
      }
    })

    this.servicesArray.map(off => {
      if (off.selected) {
        this.selectedServices.push(off.name)
      }
    })

    this.paymentsArray.map(off => {
      if (off.selected) {
        this.selectedPayments.push(off.name)
      }
    })

    const claimData: Data = {
      userFirstName: '',
      userLastName: '',
      name: firstForm.location,
      additional: '',
      street: firstForm.address,
      // streetNumber: this.streetNumber,
      zipCode: firstForm.postal,
      // zip: firstForm.postal,
      city: firstForm.city,
      countryCode: 'DE', // firstForm.area,
      url: secondFormGroup.website,
      languageCode: 'de',
      contactEmail: secondFormGroup.email,
      contactPhoneNumber: firstForm.phone,
      openingTimes: this.buildOpenHoursModel(secondFormGroup.openHours),
      offers: this.selectedOffering,
      description: '',
      category: this.categories.find(x => x.selected).name,
      services: this.selectedServices,
      paymentMethods: this.selectedPayments,
    }

    const manageBusinessData: ManageBusinessData = {
      data: claimData,
      channels: ['GOOGLE_MY_BUSINESS'],
    }

    return manageBusinessData
  }

  /**
   * This method creates the objects for the middlware
   */
  private createClaimToSave(firstForm: any, secondFormGroup: any, formConclusion: any) {
    const user: UserLoginDto = {
      email: formConclusion.email,
      password: formConclusion.password,
    }

    this.offeringsArray.map(off => {
      if (off.selected) {
        this.selectedOffering.push(off.name)
      }
    })

    this.servicesArray.map(off => {
      if (off.selected) {
        this.selectedServices.push(off.name)
      }
    })

    this.paymentsArray.map(off => {
      if (off.selected) {
        this.selectedPayments.push(off.name)
      }
    })

    const claimData: Data = {
      userFirstName: '',
      userLastName: '',
      name: firstForm.location,
      additional: '',
      street: firstForm.address,
      // streetNumber: this.streetNumber,
      zipCode: firstForm.postal,
      // zip: firstForm.postal,
      city: firstForm.city,
      countryCode: 'DE', // firstForm.area,
      url: secondFormGroup.website,
      languageCode: 'de',
      contactEmail: secondFormGroup.email,
      contactPhoneNumber: firstForm.phone,
      openingTimes: this.buildOpenHoursModel(secondFormGroup.openHours),
      offers: this.selectedOffering,
      description: '',
      category: this.category,
      services: this.selectedServices,
      paymentMethods: this.selectedPayments,
    }

    const manageBusinessData: ManageBusinessData = {
      data: claimData,
      channels: ['GOOGLE_MY_BUSINESS'],
    }

    const claimObject: UserRegisterDto = {
      user: user,
      claim: manageBusinessData,
    }

    return claimObject
  }

  private buildOpenHoursModel(openHours: any): OpeningTimes {
    let monday: Day[] = []
    let tuesday: Day[] = []
    let wednesday: Day[] = []
    let thursday: Day[] = []
    let friday: Day[] = []
    let saturday: Day[] = []
    let sunday: Day[] = []

    openHours
      .filter((x: any) => x.isSelected)
      .forEach((element: any) => {
        switch (element.name) {
          case 'monday':
            monday = this.buildDayModel(element)
            break
          case 'tuesday':
            tuesday = this.buildDayModel(element)
            break
          case 'wednesday':
            wednesday = this.buildDayModel(element)
            break
          case 'thursday':
            thursday = this.buildDayModel(element)
            break
          case 'friday':
            friday = this.buildDayModel(element)
            break
          case 'saturday':
            saturday = this.buildDayModel(element)
            break
          case 'sunday':
            sunday = this.buildDayModel(element)
            break
          default:
            break
        }
      })

    const openingTimes: OpeningTimes = {
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
    }

    return openingTimes
  }

  private buildDayModel(element: any): Day[] {
    const dayArray: Day[] = []

    let item: Day
    item = Object.assign({}, item, { startTime: element.from, endTime: element.to })
    dayArray.push(item)
    if (element.splitedFrom && element.splitedTo) {
      let splitedItem: Day
      splitedItem = Object.assign({}, splitedItem, { startTime: element.splitedFrom, endTime: element.splitedTo })
      dayArray.push(splitedItem)
    }

    return dayArray
  }

  openDialog(): void {
    this.dialog.open(ModalTermsConditionsComponent, {
      width: '550px',
    })
  }

  setAddress(addrObj: any) {
    if (!addrObj) {
      return null
    }

    this.firstFormGroup.get('location').setValue(addrObj.location)
    this.firstFormGroup.get('address').setValue(addrObj.address[0])
    this.firstFormGroup.get('postal').setValue(addrObj.postal_code)
    this.firstFormGroup.get('city').setValue(addrObj.locality)
    this.firstFormGroup.get('country').setValue(addrObj.country)
    this.streetNumber = addrObj.street_number ? addrObj.street_number : ''

    const regexPhone = addrObj.phone_number.replace(/^(049|0+)?/g, '')

    this.firstFormGroup.get('phone').setValue(regexPhone)
    this.secondFormGroup.get('website').setValue(addrObj.website)

    const formBuilder = this.formBuilder.array(this.buildOpenHoursArray(addrObj.openingHours)).value
    this.secondFormGroup.get('openHours').setValue(formBuilder)

    this.addressFocus = true
    this.addressInput.nativeElement.focus()

    this.setAreaCode(addrObj.country)
  }

  changeCountry(event: any) {
    this.setAreaCode(event.value)
  }

  private setAreaCode(countryName: string) {
    if (!countryName) {
      return
    }

    const newAreaValue = this.countries.find(c => c.name === countryName).code
    this.firstFormGroup.get('area').setValue(newAreaValue)
  }

  private validateCategoriesSelection() {
    let isOfferingsValid = false
    let isPaymentsValid = false
    let isServicesValid = false

    if (this.offeringsArray) {
      this.offeringsArray.map(off => {
        if (off.selected) {
          isOfferingsValid = true
        }
      })
    }

    this.servicesArray.map(off => {
      if (off.selected) {
        isServicesValid = true
      }
    })

    this.paymentsArray.map(off => {
      if (off.selected) {
        isPaymentsValid = true
      }
    })

    const invalid = !isOfferingsValid || !isPaymentsValid || !isServicesValid
    if (invalid) {
      this.thirdFormGroup.get('hasSelection').setValue('')
    } else {
      this.thirdFormGroup.get('hasSelection').setValue('checked')
    }
  }

  steperchange(event: any) {
    if (this.thirdFormGroup.get('hasSelection').invalid) {
      this.dialog.open(ModalTermsConditionsComponent, { data: { isOffersValidation: true }, width: '550px' })
    }

    return null
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
