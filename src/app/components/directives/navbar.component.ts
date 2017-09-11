import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'ct-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router ) { }
  isIn = false;   // store state
  toggleState() { // click handler
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }
  isActive() {
    return !this.authService.isLogedIn();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}