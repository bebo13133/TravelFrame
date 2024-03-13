import { FormGroup } from '@angular/forms';

export class PasswordValidator {
  static checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('repeatPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
}