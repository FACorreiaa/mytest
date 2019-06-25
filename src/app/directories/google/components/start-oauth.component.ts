import { Component, OnInit, Input, OnChanges } from '@angular/core'
import { BusinessData } from '@app/api/models/api-models'

@Component({
  selector: 'start-oauth',
  templateUrl: 'start-oauth.component.html',
  styleUrls: ['./start-oauth.component.scss'],
})
export class StartOauthComponent implements OnInit, OnChanges {
  @Input() businessData: BusinessData[]
  @Input() oAuthStatus: boolean
  @Input() redirectURL: string
  @Input() loading: boolean

  firstStep: boolean
  secondStep: boolean
  selectedBusiness: BusinessData

  constructor() {}

  ngOnInit() {
    this.firstStep = true
  }

  ngOnChanges() {
    if (this.businessData[this.businessData.length - 1]) {
      this.selectedBusiness = this.businessData[this.businessData.length - 1]
    }
  }

  continue() {
    this.firstStep = false
    this.secondStep = true
  }

  closeWindow() {
    window.close()
  }
}
