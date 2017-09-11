import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashBoardComponent {
  constructor(private router: Router, private authenticationService: AuthService) {
  }
}