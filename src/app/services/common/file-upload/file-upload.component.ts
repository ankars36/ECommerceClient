import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from '../../ui/toastr-custom.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadState } from '../../../dialogs/file-upload-dialog/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})

export class FileUploadComponent {
  constructor(private httpClientService: HttpClientService, private alertifyService: AlertifyService, private toastrCustomService: ToastrCustomService, private dialog: MatDialog, private dialogService: DialogService) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath)
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadState.Yes,
      afterClosed: () => {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryParameters: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {
          const message: string = "Files uploaded succesfully.";
          if (this.options.isAdminPage) {
            this.alertifyService.message(message, {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            });
          }
          else {
            this.toastrCustomService.message(message, "Success", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            });
          }
        }, (errorResponse: HttpErrorResponse) => {
          const message: string = errorResponse.message;
          if (this.options.isAdminPage) {
            this.alertifyService.message(message, {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            });
          }
          else {
            this.toastrCustomService.message(message, "Error", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            });
          }
        });
      }
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}

