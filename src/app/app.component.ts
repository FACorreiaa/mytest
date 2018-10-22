import { Component } from '@angular/core'
import { AppRoutes as AuthRoutes } from './app.routing'
import { Router } from '@angular/router'

/**
 * The app component.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  onLoginClick(event) {
    this.router.navigate([AuthRoutes.LOGIN])
  }
}
