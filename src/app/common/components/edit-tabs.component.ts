import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  EventEmitter,
  Output,
} from '@angular/core'
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms'
import { ZipCodeValidation, PhoneNumberValidation, PhoneNumberPrefixValidation, EmailValidation, CustomValidators } from '@app/common/validations'
import { Countries, Data, ICategory, OpeningTimes, Day, IHours, OpenHoursArray, CategoriesArray, ManageBusinessData } from '@app/api/models/api-models'
import { MatExpansionPanel, MatDialog } from '@angular/material'
import { ModalTermsConditionsComponent } from './model-term-conditions'

@Component({
  selector: 'edit-tabs',
  templateUrl: 'edit-tabs.component.html',
  styleUrls: ['./edit-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTabsComponent implements OnInit, OnChanges, AfterViewChecked {
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  thirdFormGroup: FormGroup
  servicesArray: ICategory[] = []
  paymentsArray: ICategory[] = []
  offeringsArray: ICategory[] = []
  addressFocus = false
  businessEmail = ''
  category = ''
  streetNumber = ''
  hours: IHours[]
  categories: ICategory[]
  selectedOffering: string[] = []
  selectedServices: string[] = []
  selectedPayments: string[] = []

  @Input() businessToEdit: Data
  @Input() businessToEditId: number
  @Input() newBusiness: false
  @Input() business: Data[]
  @Input() offerings: any[]
  @Input() services: any[]
  @Input() payments: any[]
  @Input() countries: Countries[]
  @Output() private editionEvent = new EventEmitter()
  @Output() private goToDashboard = new EventEmitter()

  @ViewChild('expansionPanel') myPanels: MatExpansionPanel
  @ViewChild('address') addressInput: ElementRef

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private change: ChangeDetectorRef) {
    this.buildInitalFormGroup()
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.business) {
      this.businessToEdit = this.business.find(bs => bs.id === this.businessToEditId)

      if (this.businessToEdit) {
        this.firstFormGroup = this.formBuilder.group({
          location: [this.businessToEdit.name, Validators.required],
          address: [this.businessToEdit.street, Validators.required],
          postal: new FormControl(this.businessToEdit.zipCode, ZipCodeValidation),
          city: [this.businessToEdit.city, Validators.required],
          phone: [this.businessToEdit.contactPhoneNumber, PhoneNumberValidation],
          area: ['+49', PhoneNumberPrefixValidation],
          country: ['Germany', Validators.required],
        })

        this.businessEmail = this.businessToEdit.contactEmail
        this.secondFormGroup = this.formBuilder.group({
          email: [this.businessEmail, EmailValidation],
          website: [
            this.businessToEdit.url,
            Validators.compose([
              Validators.required,
              CustomValidators.patternValidator({
                invalidSite: true,
              }),
            ]),
          ],
          openHours: this.formBuilder.array(this.buildOpenHoursArray(this.businessToEdit.openingTimes)),
        })

        this.categories = CategoriesArray()
        this.hours = OpenHoursArray()

        this.categories.map(x => {
          x.selected = false
          if (x.name === this.businessToEdit.category) {
            x.selected = true
          }
        })
      }
    }
  }

  ngAfterViewChecked() {
    if (this.addressFocus) {
      this.addressInput.nativeElement.focus()
      this.addressFocus = false
    }

    if (this.businessToEdit && this.offerings && this.offeringsArray.length === 0) {
      this.offerings.filter(x => x.name === this.businessToEdit.category)[0].offering.map(x => this.offeringsArray.push({ name: x, selected: false }))

      this.offeringsArray.map(x => {
        if (this.businessToEdit.offers && this.businessToEdit.offers.includes(x.name)) {
          x.selected = true
        }
      })
    }

    if (this.businessToEdit && this.services && this.servicesArray.length === 0) {
      this.services.map(x => this.servicesArray.push({ name: x, selected: false }))
      this.servicesArray.map(x => {
        if (this.businessToEdit.services && this.businessToEdit.services.includes(x.name)) {
          x.selected = true
        }
      })
    }

    if (this.businessToEdit && this.payments && this.paymentsArray.length === 0) {
      this.payments.map(x => this.paymentsArray.push({ name: x, selected: false }))
      this.paymentsArray.map(x => {
        if (this.businessToEdit.paymentMethods && this.businessToEdit.paymentMethods.includes(x.name)) {
          x.selected = true
        }
      })
    }

    this.validateCategoriesSelection()

    this.change.detectChanges()
  }

  get openHoursArray(): FormArray {
    return <FormArray>this.secondFormGroup.get('openHours')
  }

  changeCountry(event) {
    this.setAreaCode(event.value)
  }

  setAddress(addrObj) {
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

    this.addressFocus = true
    this.addressInput.nativeElement.focus()

    this.setAreaCode(addrObj.country)
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

  backToDashboard(event: any) {
    this.goToDashboard.emit(event)
  }

  saveFirstSecondStep(firstForm: any, secondFormGroup: any) {
    this.editionData(firstForm.value, secondFormGroup.value)
  }

  saveDataOfferings(firstForm: any, secondFormGroup: any) {
    if (this.thirdFormGroup.get('hasSelection').invalid) {
      this.dialog.open(ModalTermsConditionsComponent, { data: { isOffersValidation: true }, width: '550px' })

      return null
    }

    this.editionData(firstForm.value, secondFormGroup.value)
  }

  /**
   * This method save the business edition.
   */
  private editionData(firstForm: any, secondFormGroup: any) {
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
      zipCode: firstForm.postal,
      city: firstForm.city,
      countryCode: 'DE',
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

    this.editionEvent.emit(manageBusinessData)
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

    this.categories = CategoriesArray()
    this.categories.map(x => {
      x.selected = false
    })

    this.hours = OpenHoursArray()
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
      .filter(x => x.isSelected)
      .forEach(element => {
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

  private setAreaCode(countryName: string) {
    if (!countryName) {
      return
    }

    const newAreaValue = this.countries.find(c => c.name === countryName).code
    this.firstFormGroup.get('area').setValue(newAreaValue)
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
    if (!day) {
      return this.formBuilder.group({
        name: [dayName],
        isSelected: [false],
        from: new FormControl({ value: '', disabled: true }, Validators.required),
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
}
