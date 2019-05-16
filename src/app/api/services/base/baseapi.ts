import { GlobalEnvironmentService } from '@app/global.environment.service'
import { ApiHttpService } from '@app/api/http/http.service'
import { Injector } from '@angular/core'
import { Observable, throwError } from 'rxjs'

import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http'
import { IRequestOptions, IRequestOptionsText } from '@app/api/models/api-models'
import { map, catchError, tap } from 'rxjs/operators'

export abstract class BaseApi {
  private apiUrl: string
  private basehttp: ApiHttpService
  private serverSettings: GlobalEnvironmentService

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
    return this.basehttp.Get(`${this.apiUrl}/${path}`).pipe(
      map((res: Response) => {
        const responseObject = res as any
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
    return this.basehttp.Post(`${this.apiUrl}/${path}`, obj).pipe(
      map((res: Response) => {
        const responseObject = res as any
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
  public getObjectsPOST_Text<T>(obj: Object, path: string): Observable<string> {
    const reqOptions: IRequestOptionsText = {
      responseType: 'text',
    }

    return this.basehttp.PostText(`${this.apiUrl}/${path}`, obj, reqOptions).pipe(
      map((res: string) => {
        const responseObject = res
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
    return this.basehttp.Delete(`${this.apiUrl}/${path}`, obj).pipe(
      map((res: Response) => {
        const responseObject = res as any
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
    return this.basehttp.Put(`${this.apiUrl}/${path}`, obj).pipe(
      map((res: Response) => {
        const responseObject = res as any
        return responseObject
      }),
      catchError((error: any) => throwError(error))
    )
  }
}
