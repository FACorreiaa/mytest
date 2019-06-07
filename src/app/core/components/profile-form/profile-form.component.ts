import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnChanges, SimpleChanges, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormGroupDirective, NgForm } from '@angular/forms'
import { CustomValidators, ZipCodeValidation, EmailValidation, PhoneNumberValidation, PhoneNumberPrefixValidation } from '@app/core/validations'
import { OpeningTimes, Day, IHours, OpenHoursArray, CategoriesArray, ICategory, UserRegisterDto, BusinessData, ManageBusinessData, Countries } from '@app/api/models/api-models'

import { MatExpansionPanel, ErrorStateMatcher, MatDialog, MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material'
import { Observable } from 'rxjs'
import { startWith, map } from 'rxjs/operators'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.touched && control.parent.dirty)
    const invalidParent = !!(control && control.parent && control.parent.touched && control.parent.invalid && control.parent.dirty)

    return invalidCtrl || invalidParent
  }
}

@Component({
  selector: 'app-profile-form',
  templateUrl: 'profile-form.component.html',
  styleUrls: ['profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit, OnChanges, AfterViewChecked {
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  formConclusion: FormGroup
  matcher = new MyErrorStateMatcher()
  hours: IHours[]
  categories: ICategory[]

  OpenOfferings: boolean
  showTermConditiValidation = false
  businessEmail = ''
  category = ''
  streetNumber = ''
  selectedOffering: string[] = []
  selectedServices: string[] = []
  selectedPayments: string[] = []
  keywordsArray: string[] = []
  languagesArray: string[] = []
  servicesArray: ICategory[] = []
  paymentsArray: ICategory[] = []
  offeringsArray: ICategory[] = []
  addressFocus = false

  visible = true
  selectable = true
  removable = true
  addOnBlur = true
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]
  paymentCtrl = new FormControl()
  filteredPayments: Observable<string[]>
  allowFreeText = false

  toggleButton = false

  @Input() formId = 'basic'

  @Input() authorized: any
  @Input() editForm: false
  @Input() businessToEdit: BusinessData
  @Input() businessToEditId: number
  @Input() business: BusinessData[]
  @Input() offerings: any[]
  @Input() services: any[]
  @Input() payments: any[]
  @Input() countries: Countries[]
  @Input() profileData: BusinessData[]
  @Output() private registerEvent = new EventEmitter()
  @Output() private editionEvent = new EventEmitter()
  @Output() private goToProfileEvent = new EventEmitter()

  @ViewChild('expansionPanel') myPanels: MatExpansionPanel
  @ViewChild('address') addressInput: ElementRef

  @ViewChild('paymentInput') paymentInput: ElementRef<HTMLInputElement>
  @ViewChild('auto') matAutocomplete: MatAutocomplete

  /*
   * Method to get opening hours array in onboarding second step.
   */
  get openHoursArray(): FormArray {
    return <FormArray>this.firstFormGroup.get('openHours')
  }

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private change: ChangeDetectorRef) {
    this.buildInitalFormGroup()
  }

  ngOnInit() {
    this.filteredPayments = this.paymentCtrl.valueChanges.pipe(
      startWith(null),
      map(paymentName => this.filterOnValueChange(paymentName))
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.services && this.services) {
      this.services.map(x => this.servicesArray.push({ name: x, selected: false }))
    }
    if (changes.payments && this.payments) {
      this.payments.map(x => this.paymentsArray.push({ name: x, selected: false }))
    }
    console.log('test', this.profileData)
  }

  ngAfterViewChecked() {
    if (this.addressFocus) {
      this.addressInput.nativeElement.focus()
      this.addressFocus = false
    }

    this.change.detectChanges()
  }

  /*
   * Method to add and remove Chips in a MatChipInput field
   */

  addKeywords(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value

    if ((value || '').trim()) {
      this.keywordsArray.push(value.trim())
    }

    if (input) {
      input.value = ''
    }
  }

  removeKeywords(Keyword: string): void {
    const index = this.keywordsArray.indexOf(Keyword)

    if (index >= 0) {
      this.keywordsArray.splice(index, 1)
    }
  }

  addLanguages(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value

    if ((value || '').trim()) {
      this.languagesArray.push(value.trim())
    }

    if (input) {
      input.value = ''
    }
  }

  removeLanguages(Language: string): void {
    const index = this.languagesArray.indexOf(Language)

    if (index >= 0) {
      this.languagesArray.splice(index, 1)
    }
  }

  addPayments(event: MatChipInputEvent): void {
    if (!this.allowFreeText) {
      return
    }

    if (!this.matAutocomplete.isOpen) {
      return
    }

    const value = event.value
    if ((value || '').trim()) {
      this.selectPaymentByName(value.trim())
      console.log(this.selectedPayments)
    }
    this.resetInputs()
  }

  removePayments(iCategory: string): void {
    const index = this.selectedPayments.indexOf(iCategory)

    if (index >= 0) {
      this.selectedPayments.splice(index, 1)
      this.resetInputs()
    }
    console.log(this.selectedPayments)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectPaymentByName(event.option.value)
    this.resetInputs()
  }

  private resetInputs() {
    this.paymentInput.nativeElement.value = ''
    this.paymentCtrl.setValue(null)
  }

  private filterOnValueChange(paymentName: string | null): string[] {
    let result: string[] = []

    const allPaymentsLessSelected = this.paymentsArray.filter(payment => this.selectedPayments.indexOf(payment.name) < 0)
    if (paymentName) {
      result = this.filterPayment(allPaymentsLessSelected, paymentName)
    } else {
      result = allPaymentsLessSelected.map(payment => payment.name)
    }
    return result
  }

  private filterPayment(paymentList: ICategory[], paymentName: string): string[] {
    let filteredPaymentList: ICategory[] = []
    const filterValue = paymentName.toLowerCase()
    const paymentsMatchingPaymentName = paymentList.filter(payment => payment.name.toLowerCase().indexOf(filterValue) === 0)
    if (paymentsMatchingPaymentName.length || this.allowFreeText) {
      filteredPaymentList = paymentsMatchingPaymentName
    } else {
      filteredPaymentList = paymentList
    }
    return filteredPaymentList.map(payment => payment.name)
  }

  private selectPaymentByName(paymentName: ICategory | string) {
    const foundPayment = this.paymentsArray.filter(payment => payment.name === paymentName)
    if (foundPayment.length) {
      this.selectedPayments.push(foundPayment[0].name)
    }
  }

  toggleOfferings() {
    this.toggleButton = !this.toggleButton
  }

  toggleService(service: ICategory) {
    service.selected = !service.selected
  }
  /*
   * Method to initalize form groups for each step.
   */
  private buildInitalFormGroup() {
    this.firstFormGroup = this.formBuilder.group({
      location: ['', Validators.required],
      address: ['', Validators.required],
      postal: new FormControl('', ZipCodeValidation),
      city: ['', Validators.required],
      phone: ['', PhoneNumberValidation],
      mobile: ['', PhoneNumberValidation],
      area: ['+49', PhoneNumberPrefixValidation],
      country: ['Germany', Validators.required],
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
      openHours: this.formBuilder.array(this.buildOpenHoursArray(this.profileData[0].openingTimes)),
    })

    this.secondFormGroup = this.formBuilder.group({
      payments: ['', Validators.required],
    })

    this.categories = CategoriesArray()
    this.categories.map(x => {
      x.selected = false
    })

    this.hours = OpenHoursArray()
  }

  /**
   * Initializes openeing hours with initial state or not if days is not null.
   * @param days days of the week to build
   */
  private buildOpenHoursArray(days?: OpeningTimes) {
    const groups = []

    if (!days) {
      groups.push(this.buildDefaultOpeningDays('Monday'))
      groups.push(this.buildDefaultOpeningDays('Tuesday'))
      groups.push(this.buildDefaultOpeningDays('Wednesday'))
      groups.push(this.buildDefaultOpeningDays('Thursday'))
      groups.push(this.buildDefaultOpeningDays('Friday'))
      groups.push(this.buildDefaultOpeningDays('Saturday'))
      groups.push(this.buildDefaultOpeningDays('Sunday'))
    } else {
      groups.push(this.buildOpenDaysFormControl(days.monday, 'Monday'))
      groups.push(this.buildOpenDaysFormControl(days.tuesday, 'Tuesday'))
      groups.push(this.buildOpenDaysFormControl(days.wednesday, 'Wednesday'))
      groups.push(this.buildOpenDaysFormControl(days.thursday, 'Thursday'))
      groups.push(this.buildOpenDaysFormControl(days.friday, 'Friday'))
      groups.push(this.buildOpenDaysFormControl(days.saturday, 'Saturday'))
      groups.push(this.buildOpenDaysFormControl(days.sunday, 'Sunday'))
    }

    return groups
  }

  /**
   * Build default opening hours data on the form.
   * @param dayName Description of the day
   */
  private buildDefaultOpeningDays(dayName: string) {
    return this.formBuilder.group(
      {
        name: [dayName],
        isSelected: [true],
        from: ['9:00'],
        to: ['17:00'],
        isSplitService: false,
        splitedFrom: [''],
        splitedTo: [''],
      },
      {
        validator: openDaysValidator,
      }
    )
  }

  /**
   * Build opening hours data on the form.
   * @param day Day opening hours data
   * @param dayName Description of the day
   */
  private buildOpenDaysFormControl(day: Day[], dayName: string) {
    if (day !== undefined && day.length <= 0) {
      return this.formBuilder.group(
        {
          name: [dayName],
          isSelected: [false],
          from: [''],
          to: [''],
          isSplitService: false,
          splitedFrom: [''],
          splitedTo: [''],
        },
        {
          validator: openDaysValidator,
        }
      )
    } else if (day !== undefined && day.length > 0) {
      return this.formBuilder.group(
        {
          name: [dayName],
          isSelected: [true],
          from: [day[0].startTime],
          to: [day[0].endTime],
          isSplitService: day.length > 1 ? true : false,
          splitedFrom: day.length > 1 ? [day[1].startTime] : [''],
          splitedTo: day.length > 1 ? [day[1].endTime] : [''],
        },
        {
          validator: openDaysValidator,
        }
      )
    }
  }

  /**
   * When user selects a new category.
   * @param event click event
   * @param item Category selected
   */
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
      this.offerings.filter(x => x.name === item.name)[0].offering.map((x: string) => this.offeringsArray.push({ name: x, selected: false }))
    }

    this.validateCategoriesSelection()

    this.myPanels.open()
  }

  /**
   * When users check/unckeck some offering.
   * @param event click event
   * @param item offering selected
   */
  onOfferingsChange(event, item) {
    item.selected = !item.selected

    this.validateCategoriesSelection()
  }

  /**
   * When users check/unckeck some service.
   * @param event click event
   * @param item service selected
   */
  onServicesChange(event, item) {
    item.selected = !item.selected

    this.validateCategoriesSelection()
  }

  /**
   * When users check/unckeck some payment.
   * @param event click event
   * @param item payment selected
   */
  onPaymentsChange(event, item) {
    item.selected = !item.selected

    this.validateCategoriesSelection()
  }

  /**
   * Event fired when user goes to main page.
   */
  goToProfile() {
    this.goToProfileEvent.emit()
  }

  /**
   * This method save the claim and registration information.
   */
  save(form: FormGroup, secondFormGroup: FormGroup) {
    const claim = this.createClaimToSave(form.value, secondFormGroup.value)

    this.registerEvent.emit(claim)
  }

  /**
   * This method creates the object dto for the middlware service
   */
  private createClaimToSave(firstForm: any, secondFormGroup: any) {
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

    const claimData: BusinessData = {
      userFirstName: '',
      userLastName: '',
      channels: null,
      name: firstForm.location,
      additional: '',
      street: firstForm.address,
      zipCode: firstForm.postal,
      city: firstForm.city,
      countryCode: 'DE',
      url: firstForm.website,
      languageCode: 'de',
      contactEmail: firstForm.email,
      contactPhoneNumber: firstForm.phone,
      openingTimes: this.buildOpenHoursModel(firstForm.openHours),
      offers: this.selectedOffering,
      description: '',
      category: this.category,
      services: this.selectedServices,
      paymentMethods: this.selectedPayments,
      keywords: this.keywordsArray,
      languages: this.languagesArray,
    }

    const manageBusinessData: ManageBusinessData = {
      data: claimData,
      channels: ['GOOGLE_MY_BUSINESS'],
    }

    const claimObject: UserRegisterDto = {
      user: null,
      claim: manageBusinessData,
    }

    return claimObject
  }

  /**
   * Build opening hours dto model to send in service.
   * @param openHours the opening hours array for each day of the week.
   */
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
          case 'Monday':
            monday = this.buildDayModel(element)
            break
          case 'Tuesday':
            tuesday = this.buildDayModel(element)
            break
          case 'Wednesday':
            wednesday = this.buildDayModel(element)
            break
          case 'Thursday':
            thursday = this.buildDayModel(element)
            break
          case 'Friday':
            friday = this.buildDayModel(element)
            break
          case 'Saturday':
            saturday = this.buildDayModel(element)
            break
          case 'Sunday':
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

  /**
   * Build the day model to send in service.
   * @param element the day data.
   */
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

  /**
   * Method to build information retrieved form google places api.
   */
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
    this.firstFormGroup.get('mobile').setValue(addrObj.mobile)
    this.firstFormGroup.get('website').setValue(addrObj.website)
    this.firstFormGroup.get('email').setValue(addrObj.email)

    const formBuilder = this.formBuilder.array(this.buildOpenHoursArray(addrObj.openingHours)).value
    this.firstFormGroup.get('openHours').setValue(formBuilder)
    this.firstFormGroup.get('description').setValue(addrObj.description)
    this.firstFormGroup.get('keywords').setValue(addrObj.keywords)

    this.secondFormGroup.get('languages').setValue(addrObj.languages)

    this.addressFocus = true
    this.addressInput.nativeElement.focus()

    this.setAreaCode(addrObj.country)
  }

  /**
   * When users changes country, a new area code needs to be set.
   * @param event country selected
   */
  changeCountry(event: any) {
    this.setAreaCode(event.value)
  }

  /**
   * Set new areacode for selected country.
   * @param countryName the country name
   */
  private setAreaCode(countryName: string) {
    if (!countryName) {
      return
    }

    const newAreaValue = this.countries.find(c => c.name === countryName).code
    this.firstFormGroup.get('area').setValue(newAreaValue)
  }

  /**
   * Method to validate if the user selects at least one option from each section(offers, payments, services).
   */
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
      this.secondFormGroup.get('hasSelection').setValue('')
    } else {
      this.secondFormGroup.get('hasSelection').setValue('checked')
    }
  }
}

/**
 * Custom validator to check every days schedule and see if the hours are
 * set when the day is chosen and to verify if there is overlapping on the hours.
 * @param openDayForm form for each day to be validated
 */
function openDaysValidator(openDayForm: FormGroup): { [key: string]: boolean } {
  if (openDayForm.controls && openDayForm.controls.isSelected.value) {
    const from = openDayForm.controls.from.value ? parseInt(openDayForm.controls.from.value, 10) : null
    const to = openDayForm.controls.to.value ? parseInt(openDayForm.controls.to.value, 10) : null
    const splitedFrom = openDayForm.controls.splitedFrom.value ? parseInt(openDayForm.controls.splitedFrom.value, 10) : null
    const splitedTo = openDayForm.controls.splitedTo.value ? parseInt(openDayForm.controls.splitedTo.value, 10) : null

    if (from === null) {
      return { fromIsRequired: true, openDaysError: true }
    }

    if (to === null) {
      return { toIsRequired: true, openDaysError: true }
    }

    if (splitedTo && !splitedFrom) {
      return { splitedFromIsRequired: true, openDaysError: true }
    }

    if (!splitedTo && splitedFrom) {
      return { splitedToIsRequired: true, openDaysError: true }
    }

    if (to <= from) {
      return { toHourOverlapping: true, openDaysError: true }
    }

    if (splitedFrom && splitedTo && (splitedFrom <= from || splitedFrom <= to)) {
      return { splitedFromHourOverlapping: true, openDaysError: true }
    }

    if (splitedFrom && splitedTo <= splitedFrom) {
      return { splitedToHourOverlapping: true, openDaysError: true }
    }
  }
  return null
}
