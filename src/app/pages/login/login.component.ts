import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { LoginInfo } from '../../interfaces/login-info';
import { AuthApiService } from '../../services/auth-api.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    test: Date = new Date();
    private nativeElement: Node;

    loginUser: LoginInfo = {
        loginEmail: '',
        loginPassword: ''
    };

    loginError: string;

    constructor(
        private element: ElementRef,
        private authThang: AuthApiService,
        private routerThang: Router
    ) {
        this.nativeElement = element.nativeElement;
    }
    checkFullPageBackgroundImage() {
        const $page = $('.full-page');
        const image_src = $page.data('image');

        if (image_src !== undefined) {
            const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.checkFullPageBackgroundImage();
    }

    loginSubmit() {
        this.authThang.postLogin(this.loginUser)
          .subscribe(
            (userInfo) => {
              this.routerThang.navigate(['dashboard']);
            },

            (errInfo) => {
              console.log('Log in error', errInfo);
              // to share info about bad username vs bad password, attach more json elements
              // in the backend to errInfo
              if (errInfo.status === 401) {
                this.loginError = 'Incorrect email or password. Try again.';
              } else {
                this.loginError = 'Something went wrong. Try again later';
              }
            }
          );
      }
}
