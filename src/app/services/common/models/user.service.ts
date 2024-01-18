import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { Token_Response } from '../../../contracts/token/token_response';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from '../../ui/toastr-custom.service';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toasterService: ToastrCustomService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as Create_User;
  }

  async login(usernameOrEmail: string, password: string, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<any | Token_Response> = this.httpClientService.post<any | Token_Response>({
      controller: "users",
      action: "LoginUser"
    }, { usernameOrEmail, password });
    const tokenResponse = await firstValueFrom(observable) as Token_Response;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toasterService.message("User Login Success", "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    callBackFunction();
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<SocialUser | Token_Response> = this.httpClientService.post<SocialUser | Token_Response>({
      controller: "users",
      action: "google-login"
    }, user);
    const tokenResponse = await firstValueFrom(observable) as Token_Response;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toasterService.message("Google Login Success", "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    callBackFunction();
  }
}
