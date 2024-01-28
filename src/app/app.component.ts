import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from './services/ui/toastr-custom.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;
  
  title = 'ECommerceClient';

  constructor(public authService: AuthService, private router: Router, private toastrService: ToastrCustomService, private dynamicLoadComponentService: DynamicLoadComponentService) { authService.identityCheck(); }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();

    this.router.navigate([""]);
    this.toastrService.message("You succesfully sign out", "Sign out", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    });
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
}