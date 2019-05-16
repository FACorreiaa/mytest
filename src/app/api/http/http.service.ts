import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http'
import { IRequestOptions, IRequestOptionsText } from '../models/api-models'
import { tap } from 'rxjs/operators'

export function applicationHttpClientCreator(http: HttpClient) {
  return new ApiHttpService(http)
}

export class ApiHttpService {
  private tokenField: string

  public constructor(public http: HttpClient) {}

  public setTokenField(tokenField: string) {
    this.tokenField = tokenField
  }

  public getTokenField() {
    if (this.tokenField) {
      return this.tokenField
    } else {
      return null
    }
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(endPoint, options)
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.http.post<T>(endPoint, params, options)
  }

  /**
   * POST request type text
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptionsText} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public PostText<T>(endPoint: string, params: Object, options?: IRequestOptionsText): Observable<string> {
    return this.http.post(endPoint, params, options)
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.http.put<T>(endPoint, params, options)
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(endPoint, options)
  }
}
