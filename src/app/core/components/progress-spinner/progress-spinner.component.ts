import { Component, OnInit } from '@angular/core'

import { ProgressSpinnerMode } from '@angular/material'

@Component({
  selector: 'progress-spinner',
  templateUrl: 'progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
})
export class ProgressSpinnerComponent implements OnInit {
  maxAnswers = 10
  // currentAnswers: number
  remainingAnswers = 4
  answerValue: number
  maxValue = 100
  progressValue: number

  constructor() {}

  ngOnInit() {
    this.answerValue = this.maxValue / this.maxAnswers
    this.progressValue = this.answerValue * this.remainingAnswers
  }
}
