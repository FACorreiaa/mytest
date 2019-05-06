import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormArray } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  navbarOpen = false
  navBarMenu = [
    { id: 'dashboard', link: '/main/dashboard', label: 'cs.navmenu-dashboard', isActive: true },
    { id: 'profile', link: '/main/profile', label: 'cs.navmenu-profile', isActive: false },
  ]

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleNavBar() {
    this.navbarOpen = !this.navbarOpen
  }

  /**
   * Mark option selected to render specific style.
   * @param menuItem item value.
   */
  isActive(menuItem: any): boolean {
    let isActive = false
    if (menuItem.link === this.router.url) {
      isActive = true
    }

    return isActive
  }
}
