import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http'
import { IRequestOptions } from '../models/api-models'

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
   * @param {string} api use if there is needed to send request to different back-end than the default one.
   * @returns {Observable<T>}
   */
  public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    const token = localStorage.getItem(this.getTokenField())

    if (token) {
      const headers = new HttpHeaders()
      options = {}
      options.headers = headers.set('Authorization', token)
    }

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
    const token = localStorage.getItem(this.getTokenField())

    if (token) {
      const headers = new HttpHeaders()
      options = {}
      options.headers = headers.set('Authorization', token)
    }

    return this.http.post<T>(endPoint, params, options)
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    const token = localStorage.getItem(this.getTokenField())

    if (token) {
      const headers = new HttpHeaders()
      options = {}
      options.headers = headers.set('Authorization', token)
    }

    return this.http.put<T>(endPoint, params, options)
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    const token = localStorage.getItem(this.getTokenField())

    if (token) {
      const headers = new HttpHeaders()
      options = {}
      options.headers = headers.set('Authorization', token)
    }

    return this.http.delete<T>(endPoint, options)
  }
}
