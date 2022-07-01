import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [
    `
    .error {
        color: red
    }
    `,
    `
    div[fxLayout] {margin-top: 32px;}
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loginError = ''
  redirectUrl
  

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    //private uiService: UiService
  ) {
    route.paramMap.subscribe(params => (this.redirectUrl = params.get('redirectUrl')))
  }

  ngOnInit() {
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(submittedForm: FormGroup) {
    var url = this.baseUrl + "api/token/auth";
    var username = submittedForm.value.username;
    var password = submittedForm.value.password;

    this.authService.login(username, password)
      .subscribe(res => {
        // login successful
        this.router.navigate(["stock-items-list"]);
      },
        err => {
          // login failed
          console.log(err)
          submittedForm.setErrors({
            "auth": "Incorrect username or password"
          });
        });
  }

}

