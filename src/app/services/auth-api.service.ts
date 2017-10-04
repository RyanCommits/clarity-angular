import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { SignupInfo } from '../interfaces/signup-info';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthApiService {

  baseUrl = environment.apiUrl;

  // login guard functions
  loginStatusSubject =  new BehaviorSubject<any>({ isLoggedIn: false});
  loginStatusNotifier = this.loginStatusSubject.asObservable();

  constructor(
    private httpThang: HttpClient
  ) { }

  postSignup(userInfo: SignupInfo) {
    console.log('service happened')
    return this.httpThang.post(
        this.baseUrl + '/api/process-signup',
        userInfo,
        // sends cookie to the backend
        { withCredentials: true }
      )
      .do((userInfo) => {
        console.log('service subscribe happened')
        this.loginStatusSubject.next({
          isLoggedIn: true,
          userInfo: userInfo
        });
      });
  }
}
