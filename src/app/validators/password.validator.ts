import { AbstractControl } from '@angular/forms';

export function PasswordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');
  if (password.pristine || repeatPassword.pristine) {
    return null;
  }
  return password && repeatPassword && password.value !== repeatPassword.value
    ? { misMatch: true }
    : null;
}
