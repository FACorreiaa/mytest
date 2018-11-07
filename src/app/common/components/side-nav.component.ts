import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  GoToDashboard() {
    this.router.navigate(['../main/dashboard'], { relativeTo: this.route })
  }
}
