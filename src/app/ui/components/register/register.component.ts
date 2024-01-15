import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }

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

  onSubmit(data: User) {
    if (this.frm.invalid)
      return;
  }

}
