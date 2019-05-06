import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Countries } from '@app/api/models/api-models'

@Injectable()
export class CountriesService {
  constructor(public http: Http) {}

  public getCountries(): Observable<Countries[]> {
    return this.http.get('assets/countries/country-prefix.json').pipe(map((response: any) => response.json().countries))
  }
}
