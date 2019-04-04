import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
  navigation = [{ link: 'about', label: 'anms.menu.about' }, { link: 'features', label: 'anms.menu.features' }, { link: 'examples', label: 'anms.menu.examples' }]
  navigationSideMenu = [{ link: './#/main/dashboard', label: 'Dashboard' }, { link: './#/main/profile', label: 'Profile' }]

  constructor(private router: Router, private route: ActivatedRoute) {}

  goToDashboard() {
    this.router.navigate(['../main/dashboard'], { relativeTo: this.route })
  }

  addBusiness() {
    this.router.navigate(['../wizard'], { relativeTo: this.route })
  }
}
