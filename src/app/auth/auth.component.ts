import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AppRoutes as AuthRoutes } from '../app.routing'

/**
 * The Authentication Component
 */
@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private router: Router) {}

  onLoginClick(event) {
    this.router.navigate([AuthRoutes.LOGIN])
  }
}
