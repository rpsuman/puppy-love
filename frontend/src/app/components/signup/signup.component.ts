import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { Crypto } from '../../crypto';

const passwordMatchValidator: ValidatorFn = (g: FormGroup) => {
   return g.get('password').value === g.get('password1').value ? null : { mismatch: true };
};

@Component({
  selector: 'puppy-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent {

  mailForm: FormGroup;
  signupForm: FormGroup;

  @Output()
  private mail = new EventEmitter<string>();
  @Output()
  private signup = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    // Create Form
    this.mailForm = this.fb.group({
      roll: ['', Validators.required],
    });
    this.signupForm = this.fb.group({
      roll: ['', Validators.required],
      password: ['', Validators.required],
      password1: ['', Validators.required],
      authCode: ['', Validators.required],
    }, { validator: passwordMatchValidator });
  }

  onMail() {
    console.log(this.mailForm.value.roll.toLowerCase());
    this.mail.emit(this.mailForm.value.roll.toLowerCase());
  }

  onSignup() {
    const { authCode, password, roll } = { authCode: this.signupForm.value.authCode,
                                           password: this.signupForm.value.password, 
                                           roll: this.signupForm.value.roll.toLowerCase()};

    const beginData = Crypto.fromJson({
      choices: []
    });

    const crypto = new Crypto(password);
    // const crypto2 = new Crypto(ccpass);

    const passHash = Crypto.hash(Crypto.hash(Crypto.hash(password)));

    crypto.newKey();

    // Store encrypted private key, public key, and encrypted empty data
    const body = {
      roll,
      passHash,
      authCode,
      privKey: crypto.encryptSym(crypto.serializePriv()),
      pubKey: crypto.serializePub(),
      // savePass: crypto2.encryptSym(password),
      data: crypto.encryptSym(beginData)
    };
    console.log(this.body);

    this.signup.emit(body);
  }

}
