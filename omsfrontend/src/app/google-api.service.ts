import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '877108908231-uuj48jq3po8lbn6c2bd3pa85grm6sjjk.apps.googleusercontent.com',
  scope: 'openid profile email',
};


export interface UserInformation {
  info: {
    sub: string
    email: string,
    name: string,
    picture: string
  }
}
export const UserInformation = undefined;


@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInformation>()

  constructor(private readonly oAuthService: OAuthService) { 
      //oAuthService.configure(authCodeFlowConfig);

      // oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";

      // oAuthService.loadDiscoveryDocument().then( () => {
        
      //   oAuthService.tryLoginImplicitFlow().then( () => {

      
      //     if (!oAuthService.hasValidAccessToken()) {
      //       oAuthService.initLoginFlow()
      //     } else {
      //       oAuthService.loadUserProfile().then( (userProfile) => {
      //         this.userProfileSubject.next(userProfile as UserInformation)
      //         //console.log(JSON.stringify(userProfile))
      //       })
      //     }

      //   })
      // });
    }


    isLoggedIn(): boolean {
      return this.oAuthService.hasValidAccessToken()
    }
  
    signOut() {
      this.oAuthService.logOut()
    }
  

  login (){
      this.oAuthService.configure(authCodeFlowConfig);

      this.oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";

      this.oAuthService.loadDiscoveryDocument().then( () => {
        
        this.oAuthService.tryLoginImplicitFlow().then( () => {

      
          if (!this.oAuthService.hasValidAccessToken()) {
            this.oAuthService.initLoginFlow()
          } else {
            this.oAuthService.loadUserProfile().then( (userProfile) => {
              this.userProfileSubject.next(userProfile as UserInformation)
              console.log(JSON.stringify(userProfile))
            })
          }

        })
      });
  }

}

// export * from './google-api.service'

