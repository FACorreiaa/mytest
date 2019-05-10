import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'profile-feature',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.setDefaultLang('en')
  }
}
