import { Component } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from './services/ui/toastr-custom.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceClient';

  constructor(public authService: AuthService, private router: Router, private toastrService: ToastrCustomService) { authService.identityCheck(); }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();

    this.router.navigate([""]);
    this.toastrService.message("You succesfully sign out", "Sign out", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    });
  }
}