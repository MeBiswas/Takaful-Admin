import { AbstractControl } from '@angular/forms';
// Email Regex Pattern
const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function EmailValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.pristine) {
    return null;
  } else {
    return pattern.test(control.value) ? { emailPattern: true } : null;
  }
}
