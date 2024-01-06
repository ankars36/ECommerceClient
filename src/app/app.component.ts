import { Component } from '@angular/core';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from './services/ui/toastr-custom.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceClient';

  constructor(private toastr: ToastrCustomService) {
    this.toastr.message("Hello world!", "Toastr fun!", {
      messageType: ToastrMessageType.Warning, 
      position: ToastrPosition.BottomCenter
    });
  }
}

$.get("https://localhost:7001/api/products")