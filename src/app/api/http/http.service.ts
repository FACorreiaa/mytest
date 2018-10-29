import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers, RequestMethod } from '@angular/http'
import { Observable } from 'rxjs'
import { retryWhen } from 'rxjs/operators'

export class ApiHttpService extends Http {
  private tokenField: string

  constructor(private backend: XHRBackend, private defOptions: RequestOptions) {
    super(backend, defOptions)
  }

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

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = localStorage.getItem(this.getTokenField())

    if (typeof url === 'string') {
      if (!this.defOptions) {
        options = { headers: new Headers() }
      }
      this.defOptions.headers.set('Authorization', ` ${token}`)
      this.defOptions.headers.set('Content-Type', 'application/json')
    } else {
      url.headers.set('Authorization', ` ${token}`)
      url.headers.set('Content-Type', 'application/json')

      // check the headers
      // console.log('request: ', url.headers, this.defOptions)
    }

    return super.request(url, this.defOptions).pipe(
      retryWhen(errors => {
        throw Observable.throw(errors)
      })
    )
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Get, url: url }, options)
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: body, method: RequestMethod.Post, url: url }, options)
  }

  private setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs) {
    if (!request.headers) {
      request.headers = new Headers()
    }
    headers.forEach((header: Object) => {
      const key: string = Object.keys(header)[0]
      const headerValue: string = (header as any)[key]
      /* tslint:disable */
      ;(request.headers as Headers).set(key, headerValue)
    })
  }

  private mergeOptions(providedOpts: RequestOptionsArgs, defaultOpts?: RequestOptions) {
    let newOptions = defaultOpts || new RequestOptions()
    this.setGlobalHeaders([], providedOpts)
    newOptions = newOptions.merge(new RequestOptions(providedOpts))

    return newOptions
  }

  private requestHelper(requestArgs: RequestOptionsArgs, additionalOptions?: RequestOptionsArgs): Observable<Response> {
    let options = new RequestOptions(requestArgs)
    if (additionalOptions) {
      options = options.merge(additionalOptions)
    }
    return this.request(new Request(this.mergeOptions(options, this.defOptions)))
  }
}
