import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',

  strictDiscoveryDocumentValidation: false,

  redirectUri: window.location.origin,

  clientId: '877108908231-uuj48jq3po8lbn6c2bd3pa85grm6sjjk.apps.googleusercontent.com',

  scope: 'openid profile email',
};

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private readonly oAuthService: OAuthService) { 
      oAuthService.configure(authCodeFlowConfig);
      oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";

      oAuthService.loadDiscoveryDocument().then( () => {
        
        oAuthService.tryLoginImplicitFlow().then( () => {

      
          if (!oAuthService.hasValidAccessToken()) {
            oAuthService.initLoginFlow()
          } else {
            oAuthService.loadUserProfile().then( (userProfile) => {
              //this.userProfileSubject.next(userProfile as UserInfo)
              console.log(JSON.stringify(userProfile))
            })
          }

        })
      });
    }
}
