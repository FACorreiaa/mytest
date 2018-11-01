import { Directive, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core'

declare var google: any

@Directive({ selector: '[google-place]' })
export class GooglePlacesDirective implements AfterViewInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter()
  private element: HTMLInputElement

  constructor(elRef: ElementRef) {
    this.element = elRef.nativeElement
  }

  ngAfterViewInit(): void {
    if (google) {
      const autocomplete = new google.maps.places.Autocomplete(this.element)
      autocomplete.setComponentRestrictions({ country: ['de', 'pt'] })

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()))
      })
    }
  }

  private getFormattedAddress(place: any) {
    let location = []

    location = this.buildAddress(place.address_components)

    location['address'] = place.formatted_address
    location['phone_number'] = place.formatted_phone_number ? place.formatted_phone_number.replace(/ /g, '') : ''
    location['website'] = place.website
      ? place.website
          .replace('https://', '')
          .replace('http://', '')
          .replace('www.', '')
      : ''

    return location
  }

  private buildAddress(addressComponents): any[] {
    const obj = []
    for (let i = 0; i < addressComponents.length; i++) {
      const item = addressComponents[i]

      if (item['types'].indexOf('locality') > -1) {
        obj['locality'] = item['short_name']
      } else if (item['types'].indexOf('street_number') > -1) {
        obj['street_number'] = item['short_name']
      } else if (item['types'].indexOf('country') > -1) {
        obj['country'] = item['long_name']
      } else if (item['types'].indexOf('postal_code') > -1) {
        obj['postal_code'] = item['short_name']
      }
    }

    return obj
  }
}
