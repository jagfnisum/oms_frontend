import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private authService: SocialAuthService, private router: Router) {}
 
  canActivate(nextRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!localStorage.getItem("APP_TOKEN")) {
      this.router.navigate(['/login'])  
      return false;
    }
    return true;
  }
 
}
