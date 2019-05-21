import { Observable } from 'rxjs'

export abstract class IRestaurantAssistentService {
  public abstract restaurantData(): Observable<IHydraResponse>
}
