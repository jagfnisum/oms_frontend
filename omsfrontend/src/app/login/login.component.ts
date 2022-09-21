import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent implements OnInit {

  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(private readonly _authService: SocialAuthService) {}

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGL(): void {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this._authService.signOut();
  }

  refreshGoogleToken(): void {
    this._authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  
}

// import { Component, OnInit } from '@angular/core';
// import { GoogleApiService, UserInformation } from '../google-api.service';

// @Component({
//   selector: 'app-google-api',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class GoogleApiComponent implements OnInit {


//   ngOnInit(): void {
//   }
//   userInfo?: UserInformation

//   constructor(private readonly googleApi: GoogleApiService) {
//     googleApi.userProfileSubject.subscribe( info => {
//       this.userInfo = info
//     })
//   }

//   isLoggedIn(): boolean {
//     return this.googleApi.isLoggedIn()
//   }

//   logout() {
//     this.googleApi.signOut()
//   }

//   login(){
//     this.googleApi.login()
//   }

// }
