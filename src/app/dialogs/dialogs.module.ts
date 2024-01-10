import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FileUploadDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule, 
    MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule
  ],
  bootstrap: [AppComponent]
})
export class DialogsModule { } 
