import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { SignupInfo } from '../interfaces/signup-info';
import { LoginInfo } from '../interfaces/login-info';

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
    return this.httpThang.post(
        this.baseUrl + '/api/process-signup',
        userInfo,
        // sends cookie to the backend
        { withCredentials: true }
      )
      .do((userInfo) => {
        this.loginStatusSubject.next({
          isLoggedIn: true,
          userInfo: userInfo
        });
      });
  }

  getLoginStatus() {
    // Get /checklogin
    const loginStatusRequest =
      this.httpThang.get(
          this.baseUrl + '/api/checklogin',
          { withCredentials: true }
        );

        loginStatusRequest.do((loggedInInfo) => {
          this.loginStatusSubject.next(loggedInInfo);
        });

    return loginStatusRequest;

  }
  // Post /process-login
  postLogin(loginCredentials: LoginInfo) {
      const loginRequest =  this.httpThang.post(
        this.baseUrl + '/api/process-login',
        loginCredentials,
        { withCredentials: true }
     );
      loginRequest.do((userInfo) => {
       this.loginStatusSubject.next({
          isLoggedIn: true,
          userInfo: userInfo
        });
     });

    return loginRequest;
  }

  logOut() {
    const logoutRequest =
      this.httpThang.delete(
        this.baseUrl + '/api/logout',
        { withCredentials: true }
    );

    logoutRequest.do(() => {
      this.loginStatusSubject.next({ isLoggedIn: false });
    });
    return logoutRequest;
  }
}
