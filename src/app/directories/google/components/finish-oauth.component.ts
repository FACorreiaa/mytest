import { Component, OnInit, Input, OnChanges } from '@angular/core'
import { BusinessData } from '@app/api/models/api-models'

@Component({
  selector: 'finish-oauth',
  templateUrl: 'finish-oauth.component.html',
  styleUrls: ['./finish-oauth.component.scss'],
})
export class FinishOauthComponent implements OnInit, OnChanges {
  @Input() businessData: BusinessData[]
  @Input() oAuthStatus: boolean
  @Input() redirectURL: string
  @Input() loading: boolean
  selectedBusiness: BusinessData
  requestAdminRightsUrl: string

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.businessData[this.businessData.length - 1]) {
      this.selectedBusiness = this.businessData[this.businessData.length - 1]

      if (this.oAuthStatus && this.selectedBusiness.channels[0].requestAdminRightsUrl) {
        this.requestAdminRightsUrl = this.selectedBusiness.channels[0].requestAdminRightsUrl
      } else {
        this.requestAdminRightsUrl = this.redirectURL
      }
    }
  }

  closeWindow() {
    window.close()
  }
}
