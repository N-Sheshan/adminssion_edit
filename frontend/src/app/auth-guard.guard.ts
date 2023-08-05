import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ServiceService} from './_service/service.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService: ServiceService, private router: Router) { }

  canActivate(): boolean {
    console.log('AuthGuard canActivate method is called.');
    if (this.authService.isLoggedIn()) {
      // this.router.navigate(['/dashboard']);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  }
  
 
