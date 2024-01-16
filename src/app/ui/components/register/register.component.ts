import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { Create_User } from '../../../contracts/users/create_user';
import { ToastrCustomService, ToastrMessageType, ToastrPosition } from '../../../services/ui/toastr-custom.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: ToastrCustomService) { }

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      passwordConfirm: ["", [Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get("password").value;
        let confpass = group.get("passwordConfirm").value;
        return pass == confpass ? null : { notSame: true };
      }
    })
  }

  get components() {
    return this.frm.controls;
  };

  async onSubmit(user: User) {
    if (this.frm.invalid)
      return;

    const result: Create_User = await this.userService.create(user);
    if (result.succeeded)
      this.toastrService.message(result.message, "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    else
      this.toastrService.message(result.message, "Error", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
  }

}
