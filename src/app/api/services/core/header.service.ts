import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HeaderService {
  webview = false

  constructor(private readonly http: HttpClient) {
    this.getHeader()
  }

  getHeader() {
    this.http
      .get(document.location.href, {
        observe: 'response',
        responseType: 'text',
      })
      .subscribe(responseResult => (this.webview = !!responseResult.headers.get('webview')))
  }
}
