import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from '../../services/ui/toastr-custom.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: ToastrCustomService, private spinner: NgxSpinnerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.BallAtom)
    const token: string = localStorage.getItem("accessToken");
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token)
    } catch {
      expired = true
    }
  
    if (!token || expired) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
      this.toastrService.message("You have to login!", "Unautharization", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })
    }
    this.spinner.hide(SpinnerType.BallAtom)
    return true;
  }

}
