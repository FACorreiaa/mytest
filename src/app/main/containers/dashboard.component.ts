import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(private router: Router) {}
}
