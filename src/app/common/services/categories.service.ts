import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { map } from 'rxjs/internal/operators/map'

@Injectable()
export class CategoriesService {
  constructor(public http: Http) {}

  public getOfferings(category: string) {
    return this.http.get('assets/categories/category-offering.json').pipe(map((response: any) => response.json().category))
  }
}
