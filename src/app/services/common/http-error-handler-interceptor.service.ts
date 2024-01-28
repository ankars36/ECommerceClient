import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from '../ui/toastr-custom.service';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: ToastrCustomService, private userAuthService: UserAuthService,private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:

        this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
          if (!state) {
            const url = this.router.url;
            if (url == "/products")
              this.toastrService.message("To add items to the cart, you need to sign in..", "Please log in!", {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight
              });
            else
              this.toastrService.message("You do not have the authority to perform this operation!", "Unauthorized operation!", {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.BottomFullWidth
              });
          }
        }).then(data => {
          this.toastrService.message("You do not have the authorization to perform this operation!", "Unauthorized operation!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
        });
        break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Internal Server Error", "Server Error", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Request is not acceptable", "Bad Request", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Request not found", "Not Found", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        default:
          this.toastrService.message("An unknown error has occurred", "Error", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
      }
      return of(error);
    }));
  }
}
