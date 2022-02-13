import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class StudentGuard implements CanActivate {
  private isValidStudent: boolean = false;

  constructor(private router: Router) {}
  canActivate() {
    if (!this.isValidStudent) {
      this.router.navigate(['access-denied']);
    }
    return this.isValidStudent;
  }
}
