import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(
    private readonly _authService: SocialAuthService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this._authService.authState.subscribe((user) => {
      this.user = user;
        localStorage.setItem('APP_TOKEN', JSON.stringify(this.user.authToken));
    });
  }

  async signOut(): Promise<void> {
    try {
      await this._authService.signOut(true);
      localStorage.removeItem('APP_TOKEN');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }


}
