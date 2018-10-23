import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { map } from 'rxjs/internal/operators/map'

@Injectable()
export class CategoriesService {
  constructor(public http: Http) {}

  public getOfferings(category: string) {
    return this.http.get('assets/categories/category-offering.json').pipe(map((response: any) => response.json().category))
  }

  public getServices() {
    return this.http.get('assets/categories/services.json').pipe(map((response: any) => response.json().services))
  }

  public getPayments() {
    return this.http.get('assets/categories/payment-methods.json').pipe(map((response: any) => response.json().payments))
  }
}
