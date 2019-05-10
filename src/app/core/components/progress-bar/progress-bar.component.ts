import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core'

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnInit {
  @Input() percentage: string
  @Input() missingItems: string[]

  constructor() {}

  ngOnInit() {
    this.percentage = '40%'
    this.missingItems = ['Category', 'Fax', 'Keywords', 'Short', 'Long', 'Imprint', 'Payment', 'Opening Hours']
  }
}
