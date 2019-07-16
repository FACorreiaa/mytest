import { Component, OnInit, Input, OnChanges } from '@angular/core'
import { Router } from '@angular/router'
import { BusinessData } from '@app/api/models/api-models'

@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnChanges {
  navbarOpen = false
  navBarMenu = [
    { id: 'dashboard', link: '/main/dashboard', label: 'csa.navmenu-dashboard', isActive: true },
    { id: 'profile', link: '/main/profile', label: 'csa.navmenu-profile', isActive: false },
    { id: 'review', link: '/main/review', label: 'csa.navmenu-review', isActive: false },
  ]
  businessName: string
  businessAddress: string

  @Input() business: BusinessData[]

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.business && this.business.length) {
      this.businessName = this.business[this.business.length - 1].name
      this.businessAddress = this.business[this.business.length - 1].street
    }
  }

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
