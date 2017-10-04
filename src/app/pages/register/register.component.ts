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

    ngOnInit() {
        this.checkFullPageBackgroundImage();
     }

    signupSubmit() {
        this.authThang.postSignup(this.newUser)
          .subscribe(
            (userInfo) => {
              this.routerThang.navigate(['/login']);
            },

            (errInfo) => {
              const response = JSON.parse(errInfo.error);
              // turns errInfo.error JSON into an object so we can
              // have access to the error message and display to form
              if (errInfo.status === 400) {
                this.errorMessage = response.errorMessage;
              } else {
                this.errorMessage = 'Something went wrong. Try again later.';
              }
            }
          );
      }
}
