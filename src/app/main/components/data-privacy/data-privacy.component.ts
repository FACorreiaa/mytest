import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'data-privacy',
  templateUrl: 'data-privacy.component.html',
  styleUrls: ['./data-privacy.component.scss'],
})
export class DataPrivacyComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    window.scrollTo(0, 0)
  }
}
