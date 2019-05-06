import { Component, Input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'cs-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingRequestComponent {
  /**
   * Specifies the message to show on loading element.
   */
  @Input() message = 'Please wait while we are loading your application data'

  /**
   * Specifies the selector to show or hide the loading
   */
  @Input() show = false
}
