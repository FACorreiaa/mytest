import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormGroupDirective, NgForm } from '@angular/forms'
import { CustomValidators, ZipCodeValidation, EmailValidation, PhoneNumberValidation, PhoneNumberPrefixValidation } from '@app/core/validations'
import {
  OpeningTimes,
  Day,
  IHours,
  OpenHoursArray,
  CategoriesArray,
  ICategory,
  BusinessData,
  Countries,
  ICategoryDto,
  ManageBusinessData,
  UpdateBusinessData,
} from '@app/api/models/api-models'

import { ErrorStateMatcher, MatChipInputEvent, MatSnackBar } from '@angular/material'
import { TranslateService } from '@ngx-translate/core'

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent implements OnInit, OnChanges {
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  matcher = new MyErrorStateMatcher()
  hours: IHours[]
  categories: ICategory[]
  lastBusiness: BusinessData

  selectedOffering: string[] = []
  selectedServices: string[] = []
  selectedPayments: string[] = []
  keywordsArray: string[] = []
  languagesArray: string[] = []
  servicesArray: ICategory[] = []
  paymentsArray: ICategory[] = []
  offeringsArray: ICategory[] = []

  visible = true
  selectable = true
  removable = true
  addOnBlur = true
  isNotificationOn = false
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]
  allowFreeText = false

  rendering = false
  activeTab = 'basic'
  toggleButton = false
  imgPathServices = '../../../../assets/images/icons_services/'

  @Input() formId = 'basic'
  @Input() authorized: any
  @Input() offerings: ICategoryDto[]
  @Input() services: any[]
  @Input() payments: ICategory[]
  @Input() countries: Countries[]
  @Input() profileData: BusinessData[]
  @Input() updateProfile: boolean
  @Input() errorUpdatingProfile: boolean
  @Output() private goToProfileEvent = new EventEmitter()
  @Output() private updateBusinessEvent = new EventEmitter()

  /*
   * Method to get opening hours array in onboarding second step.
   */
  get openHoursArray(): FormArray {
    return <FormArray>this.firstFormGroup.get('openHours')
  }

  constructor(private formBuilder: FormBuilder, private change: ChangeDetectorRef, private translate: TranslateService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    // this.buildInitalFormGroup()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.services && this.services) {
      this.services.map(x => this.servicesArray.push({ name: x, selected: false }))
    }

    if (this.errorUpdatingProfile) {
      this._snackBar.open(this.translate.instant('csa.update-fail'), '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'toast-fail',
      })
    }

    if (changes.profileData && this.profileData.length) {
      this.updateFormsWithBusinessData()
    }

    if (this.updateProfile !== null) {
      if (this.updateProfile && !this.isNotificationOn) {
        this.isNotificationOn = true
        this._snackBar.open(this.translate.instant('csa.update-success'), '', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'toast-success',
        })
      } else {
        this.isNotificationOn = false
      }
    }
  }

  renderHours() {
    this.rendering = true
  }

  setActiveTab(tabId: string) {
    this.formId = tabId
  }

  isActiveTab(tabId: string) {
    return tabId === this.formId
  }

  /*
   * Method to add Chips in a MatChipInput field
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

  /*
   * Method to remove Chips in a MatChipInput field
   */
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

  toggleService(service: ICategory) {
    service.selected = !service.selected
  }

  /**
   * Event fired when user goes to main page.
   */
  goToProfile() {
    this.goToProfileEvent.emit()
  }

  changeCountry(event: any) {
    this.setAreaCode(event.value)
  }

  /**
   * This method save the business to update the information.
   */
  save(basicDataForm: FormGroup) {
    const updateData = this.createClaimToSave(basicDataForm.value)
    this.updateBusinessEvent.emit(updateData)
  }

  /**
   * This method will reset the business information in the inputs.
   */
  discardChanges() {
    this.updateFormsWithBusinessData()

    this._snackBar.open(this.translate.instant('csa.update-discard'), '', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'toast-warning',
    })
  }

  /**
   * Method that will put the business data in to the form fields
   */
  private updateFormsWithBusinessData() {
    this.lastBusiness = this.profileData[this.profileData.length - 1]

    this.firstFormGroup = this.formBuilder.group({
      location: [this.lastBusiness.name, Validators.required],
      address: [this.lastBusiness.street, Validators.required],
      postal: [this.lastBusiness.zipCode, ZipCodeValidation],
      city: [this.lastBusiness.city, Validators.required],
      country: 'Germany',
      category: this.lastBusiness.category,
      area: ['+49', PhoneNumberPrefixValidation],
      phone: [this.lastBusiness.contactPhoneNumber, PhoneNumberValidation],
      website: [
        this.lastBusiness.url,
        Validators.compose([
          Validators.required,
          CustomValidators.patternValidator({
            invalidSite: true,
          }),
        ]),
      ],
      email: [this.lastBusiness.contactEmail, EmailValidation],
      openHours: this.formBuilder.array(this.buildOpenHoursArray(this.lastBusiness.openingTimes)),
      description: this.lastBusiness.description,
    })

    this.secondFormGroup = this.formBuilder.group({
      // language: this.lastBusiness.languages,
      // payment: this.lastBusiness.paymentMethods,
      // offering: this.lastBusiness.offers,
      // service: this.lastBusiness.services,
    })

    this.keywordsArray = this.lastBusiness.keywords
    this.categories = CategoriesArray()
    this.hours = OpenHoursArray()
  }

  /**
   * This method creates the object dto for the middlware service
   */
  private createClaimToSave(basicDataForm: any) {
    const updateData: BusinessData = {
      name: basicDataForm.location,
      userFirstName: this.lastBusiness.userFirstName,
      userLastName: this.lastBusiness.userLastName,
      contactEmail: this.lastBusiness.contactEmail,
      contactPhoneNumber: basicDataForm.phone,
      countryCode: this.lastBusiness.countryCode,
      languageCode: this.lastBusiness.languageCode,
      description: basicDataForm.description,
      url: this.lastBusiness.url,
      category: basicDataForm.category,
      zipCode: basicDataForm.postal,
      city: basicDataForm.city,
      street: basicDataForm.address,
      additional: '',
      keywords: this.keywordsArray,
      openingTimes: this.buildOpenHoursModel(basicDataForm.openHours),
      offers: this.lastBusiness.offers,
      services: this.lastBusiness.services,
      paymentMethods: this.lastBusiness.paymentMethods,
    }

    const updateBusinessData: UpdateBusinessData = {
      id: this.lastBusiness.id,
      businessUnit: { data: updateData, channels: ['GOOGLE_MY_BUSINESS'] } as ManageBusinessData,
    }

    return updateBusinessData
  }

  private setAreaCode(countryName: string) {
    if (!countryName) {
      return
    }

    const newAreaValue = this.countries.find(c => c.name === countryName).code
    this.firstFormGroup.get('area').setValue(newAreaValue)
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
      area: ['+49', PhoneNumberPrefixValidation],
      country: ['Germany', Validators.required],
      category: ['', Validators.required],
      email: ['', EmailValidation],
      description: ['', Validators.required],
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

    this.secondFormGroup = this.formBuilder.group({
      payments: ['', Validators.required],
    })

    this.categories = CategoriesArray()

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
    if (day === undefined) {
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
