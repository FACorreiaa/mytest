import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'google-comp',
  templateUrl: 'google.container.html',
  styleUrls: ['./google.container.scss'],
})
export class GoogleComponent implements OnInit {
  firstStep: boolean
  secondStep: boolean

  constructor() {}

  ngOnInit() {
    this.firstStep = true
  }

  continue() {
    this.firstStep = false
    this.secondStep = true
  }
}
