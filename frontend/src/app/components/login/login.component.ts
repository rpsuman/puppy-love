import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'puppy-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {

  loginForm: FormGroup;

  @Output()
  private login = new EventEmitter<{roll: string, password: string}>();

  constructor(private fb: FormBuilder) {
    // Create Form
    this.loginForm = this.fb.group({
      roll: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get loginInfo(): {roll: string, password: string} {
    return {
            roll: this.loginForm.value.roll.toLowerCase(),
            password: this.loginForm.value.password
            };
  }

  onSubmit() {
    //console.log(this.loginInfo);
    this.login.emit(this.loginInfo);
  }

}
