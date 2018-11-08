import { IDashBoardService } from '@app/api/interfaces/i.dashboard.service'
import { BaseApi } from '../base/baseapi'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { Data } from '@app/api/models/api-models'

@Injectable()
export class DashBoardService extends BaseApi implements IDashBoardService {
  private businessControllerRoute = 'businessUnit'

  constructor(injector: Injector) {
    super(injector)
  }

  public businessData(): Observable<Data> {
    // Temporary- just for development reasons
    // const business = Observable.create(observer => {
    //   observer.next([
    //     {
    //       id: '2',
    //       additional: 'Cocus AG',
    //       category: 'restaurante',
    //       contactEmail: 'testing@cocus.com',
    //       contactPhoneNumber: '34234234324',
    //       url: 'cocus.com',
    //       street: 'rua miradouro',
    //     },
    //     {
    //       id: '1',
    //       additional: 'best restaurant ever',
    //       name: 'best restaurant ever',
    //       userFirstName: 'Hans',
    //       userLastName: 'Sarpei',
    //       description: 'Very pleasent testing restaurant.',
    //       contactPhoneNumber: '15165137500',
    //       contactEmail: 'info@claiming-service.de',
    //       countryCode: '+49',
    //       languageCode: 'de',
    //       url: 'demo.eatbu.com/',
    //       menuUrl: null,
    //       reservationUri: 'https://demo.eatbu.com/#reserve',
    //       titleImageUri: 'https://demo.eatbu.com/media/title.jpg',
    //       profileImageUri: 'https://demo.eatbu.com/media/image.jpg',
    //       userId: 1,
    //       category: 'bistro',
    //       zipCode: '12345',
    //       city: 'Hamburg',
    //       street: 'Sesamstreet',
    //       streetNumber: '17A',
    //       channels: [
    //         {
    //           channel: 'GOOGLE_MY_BUSINESS',
    //           callbackUrl: null,
    //           errorCode: null,
    //         },
    //       ],
    //       offers: ['beer', 'brewery', 'burger', 'americanCuisine'],
    //       paymentMethods: ['amex', 'cash', 'cheque', 'mastercard', 'visa'],
    //       services: ['accessible', 'freeWifi', 'takeaway'],
    //     },
    //   ])
    //   observer.complete()
    // })

    // return business
    return this.getObjects(`${this.businessControllerRoute}/getAll`)
  }

  public editBusinessData(): Observable<any> {
    // Temporary- just for development reasons
    return Observable.create(observer => {
      observer.next({ success: 'true' })
      observer.complete()
    })
  }
}
