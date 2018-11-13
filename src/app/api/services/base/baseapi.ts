import { GlobalEnvironmentService } from '@app/global.environment.service'
import { ApiHttpService } from '@app/api/http/http.service'
import { Injector } from '@angular/core'
import { Observable, throwError } from 'rxjs'

import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http'
import { } from '@app/api/models/api-models'
import { map, catchError } from 'rxjs/operators'

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
        return responseObject
      }),
      catchError((error: any) => throwError(error))
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
      catchError((error: any) => throwError(error))
    )
  }

  /**
   * Using DELETE.
   * Method to send a request of type form. DELETE
   * @param obj - The object value.
   * @param path - The path from resource.
   */
  public getObjectsDELETE<T>(obj: Object, path: string): Observable<T> {
    this.setHeaderForRequest('DELETE')
    return this.basehttp.delete(`${this.apiUrl}/${path}`, obj, this.defOptions).pipe(
      map((res: Response) => {
        const responseObject = res.json() as any
        return responseObject
      }),
      catchError((error: any) => throwError(error))
    )
  }

  /**
   * Using PUT.
   * Method to send a request of type form. DELETE
   * @param obj - The object value.
   * @param path - The path from resource.
   */
  public getObjectsPUT<T>(obj: Object, path: string): Observable<T> {
    this.setHeaderForRequest('PUT')
    return this.basehttp.put(`${this.apiUrl}/${path}`, obj, this.defOptions).pipe(
      map((res: Response) => {
        const responseObject = res.json() as any
        return responseObject
      }),
      catchError((error: any) => throwError(error))
    )
  }

  private setHeaderForRequest(type: string): void {
    switch (type) {
      case 'POST':
        {
          const headers = new Headers({ 'Content-Type': 'application/json' })
          this.defOptions = new RequestOptions({ headers: headers })
        }
        break
      case 'GET':
        {
          const headers = new Headers({ 'Content-Type': 'application/json' })
          this.defOptions = new RequestOptions({ headers: headers })
        }
        break
      case 'DELETE':
        {
          const headers = new Headers({ 'Content-Type': 'application/json' })
          this.defOptions = new RequestOptions({ headers: headers })
        }
        break
      case 'PUT':
        {
          const headers = new Headers({ 'Content-Type': 'application/json' })
          this.defOptions = new RequestOptions({ headers: headers })
        }
        break
      case 'FORM':
      default:
        break
    }
  }
}
