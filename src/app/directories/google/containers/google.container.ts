import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'google-comp',
  templateUrl: 'google.container.html',
  styleUrls: ['./google.container.scss'],
})
export class GoogleComponent implements OnInit {
  firstStep: boolean
  secondStep: boolean

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.setDefaultLang('en')
    this.firstStep = true
  }

  continue() {
    this.firstStep = false
    this.secondStep = true
  }
}
