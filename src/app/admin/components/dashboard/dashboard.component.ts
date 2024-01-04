import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private alertify: AlertifyService) { }
  ngOnInit(): void {

  }

  m() {
    this.alertify.message("merhaba", {
      messageType: MessageType.Success,
      delay: 5,
      position: Position.BottomCenter
    });
  }

  d() {
    this.alertify.dismiss();
  }
}
