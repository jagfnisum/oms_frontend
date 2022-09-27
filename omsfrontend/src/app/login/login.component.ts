import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
 
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent implements OnInit {
 
  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;
 
  constructor(private readonly _authService: SocialAuthService, private router: Router) {}
 
  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      this.user = user;
        localStorage.setItem('APP_TOKEN', JSON.stringify(this.user.authToken));
        this.router.navigate(['/orders']);
 
    });
  }
 
  signInWithGL(): void {
   
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);
 
  }
 
  signOut(): void {
    this._authService.signOut();
    localStorage.removeItem('TOKEN');
    this.router.navigate(['/login']);
  }
 
  refreshGoogleToken(): void {
    this._authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
 
  }
 
}
