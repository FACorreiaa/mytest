import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core'

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnInit {
  @Input() percentage: number
  @Input() missingItems: string[]

  constructor() {}

  ngOnInit() {
    this.percentage = 55
    this.missingItems = ['category', 'fax', 'Opening Hours', 'Keywords', 'Short', 'Long', 'Imprint', 'Payment']
  }
}
