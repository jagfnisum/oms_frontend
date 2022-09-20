import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GoogleApiService, UserInfo } from '../google-api.service';


@Component({
  selector: 'google-api',
  templateUrl: './google-api.component.html',
  styleUrls: ['./google-api.component.css']
})
export class GoogleApiComponent implements OnInit {

  constructor(private readonly googleApi: GoogleApiService) {
    googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })
  }

  ngOnInit(): void {
  }

  title = 'angular-google-oauth-example';

  userInfo?: UserInfo

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  logout() {
    this.googleApi.signOut()
  }


}
