import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { SignupInfo } from '../../interfaces/signup-info';
import { AuthApiService } from '../../services/auth-api.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit{
    test: Date = new Date();
    private nativeElement: Node;

    newUser: SignupInfo = {
        signupFirstName: '',
        signupLastName:  '',
        signupEmail:     '',
        signupPassword:  ''
      };

    errorMessage: string;

    constructor(
        private element: ElementRef,
        private authThang: AuthApiService,
        private routerThang: Router
    ) {
        this.nativeElement = element.nativeElement;
    }
    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() { }

    signupSubmit() {
        console.log('signup happened')
        this.authThang.postSignup(this.newUser)
          .subscribe(
            (userInfo) => {
              this.routerThang.navigate(['']);
              console.log('subscribe happened')
            },

            (errInfo) => {
              console.log('Sign up error', errInfo);
              if (errInfo.status === 400) {
                this.errorMessage = 'Validation error';
              } else {
                this.errorMessage = 'Something went wrong. Try again later.';
              }
            }
          );
      }
}
