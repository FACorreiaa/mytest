import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { BaseApi } from '../base/baseapi'
import { IRestaurantAssistentService } from '@app/api/interfaces/i.restaurant-assistent.service'

@Injectable()
export class RestaurantAssistentService extends BaseApi implements IRestaurantAssistentService {
  private restaurantControllerRoute = 'restaurantAssistent'

  constructor(injector: Injector) {
    super(injector)
  }

  public restaurantData(): Observable<IHydraResponse> {
    const id = '1085698'
    return this.getObjects(`${this.restaurantControllerRoute}/${id}`)
  }
}
