import { GlobalEnvironmentService } from '@app/global.environment.service'
import { ApiHttpService } from '@app/api/http/http.service'
import { Injector } from '@angular/core'
import { Observable } from 'rxjs'

import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http'
import {} from '@app/api/models/api-models'
import { map, catchError, tap } from 'rxjs/operators'

export abstract class BaseApi {
  private apiUrl: string
  private basehttp: ApiHttpService
  private serverSettings: GlobalEnvironmentService
  private defOptions?: RequestOptionsArgs

  constructor(injector: Injector) {
    this.basehttp = injector.get(ApiHttpService)
    this.serverSettings = injector.get(GlobalEnvironmentService)
    this.basehttp.setTokenField(this.serverSettings.getTokenPath())
    this.apiUrl = this.serverSettings.getApiUrl()
  }

  /**
   * Using GET.
   * Method to get a list of objects from database.
   * @param path - The path from resource.
   */
  public getObjects<T>(path: string): Observable<T> {
    this.setHeaderForRequest('GET')
    return this.basehttp.get(`${this.apiUrl}/${path}`, this.defOptions).pipe(
      map((res: Response) => {
        const responseObject = res.json() as any
        if (responseObject.Success) {
          return responseObject.Result
        } else {
          throw new Error('Could not process the request')
        }
      }),
      catchError((error: any) => Observable.throw(error))
    )
  }

  /**
   * Using POST.
   * Method to send a request of type form. POST
   * @param obj - The object value.
   * @param path - The path from resource.
   */
  public getObjectsPOST<T>(obj: Object, path: string): Observable<T> {
    this.setHeaderForRequest('POST')
    return this.basehttp.post(`${this.apiUrl}/${path}`, obj, this.defOptions).pipe(
      map((res: Response) => {
        const responseObject = res.json() as any
        return responseObject
      }),
      catchError((error: any) => Observable.throw(error))
    )
  }

  /**
   * Set Headers for each request.
   * Method to set headers for every type of request.
   * @param type - Type of request.
   */
  private setHeaderForRequest(type: string): void {
    switch (type) {
      case 'POST':
        {
          const headers = new Headers({
            'content-type': 'application/json',
          })
          this.defOptions = new RequestOptions({ headers: headers })
        }
        break
      case 'PUT':
      case 'DELETE':
      case 'GET':
        {
          const headers = new Headers({
            'Content-Type': 'application/json',
          })
          this.defOptions = new RequestOptions({ headers: headers })
        }
        break
      default:
        break
    }
  }
}
