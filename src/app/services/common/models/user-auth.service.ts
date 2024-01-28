import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from '../../ui/toastr-custom.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Token_Response } from '../../../contracts/token/token_response';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toasterService: ToastrCustomService) { }

  async login(usernameOrEmail: string, password: string, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<any | Token_Response> = this.httpClientService.post<any | Token_Response>({
      controller: "auth",
      action: "LoginUser"
    }, { usernameOrEmail, password });
    const tokenResponse = await firstValueFrom(observable) as Token_Response;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toasterService.message("User Login Success", "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: (state) => void): Promise<any> {
    const observable: Observable<any | Token_Response> = this.httpClientService.post({
      action: "refreshtokenlogin",
      controller: "auth"
    }, { refreshToken: refreshToken });

    try {
      const tokenResponse: Token_Response = await firstValueFrom(observable) as Token_Response;

      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      }

      callBackFunction(tokenResponse ? true : false);
    } catch {
      callBackFunction(false);
    }
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<SocialUser | Token_Response> = this.httpClientService.post<SocialUser | Token_Response>({
      controller: "auth",
      action: "google-login"
    }, user);
    const tokenResponse = await firstValueFrom(observable) as Token_Response;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toasterService.message("Google Login Success", "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<SocialUser | Token_Response> = this.httpClientService.post<SocialUser | Token_Response>({
      controller: "auth",
      action: "facebook-login"
    }, user);
    const tokenResponse = await firstValueFrom(observable) as Token_Response;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toasterService.message("Facebook Login Success", "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    callBackFunction();
  }
}
