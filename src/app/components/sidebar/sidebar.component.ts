import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AnimationTransitionEvent } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ct-sidebar',
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent {
   constructor(private authService: AuthService, private router: Router ) { }

   isActive() {
    return !this.authService.isLogedIn();
  }

btnClickSales () {
        this.router.navigateByUrl('/sales');
};

btnClick= function () {
        this.router.navigateByUrl('/sales');
};
}


