import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from '../ui/toastr-custom.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: ToastrCustomService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("You are not authorized to perform this action", "Unauthoried", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
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
