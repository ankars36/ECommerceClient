import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoot: ActivatedRoute, private router: Router, private socialAuthService: SocialAuthService) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.BallAtom);
      await this.userService.googleLogin(user, () => {
        this.authService.identityCheck();
        this.activatedRoot.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"];
          if (returnUrl)
            this.router.navigate([returnUrl]);
          else
            this.router.navigate(["admin"]);
        });
        this.hideSpinner(SpinnerType.BallAtom);
      });
    });
  }


  ngOnInit(): void { }


  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activatedRoot.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
        else
          this.router.navigate(["admin"]);
      });
      this.hideSpinner(SpinnerType.BallAtom);
    });
  }

}
