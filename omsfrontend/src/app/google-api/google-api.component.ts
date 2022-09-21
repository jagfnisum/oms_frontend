import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInformation } from '../google-api.service';

@Component({
  selector: 'app-google-api',
  templateUrl: './google-api.component.html',
  styleUrls: ['./google-api.component.css']
})
export class GoogleApiComponent implements OnInit {


  ngOnInit(): void {
  }
  userInfo?: UserInformation

  constructor(private readonly googleApi: GoogleApiService) {
    googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  logout() {
    this.googleApi.signOut()
  }

  login(){
    this.googleApi.login()
  }

}
