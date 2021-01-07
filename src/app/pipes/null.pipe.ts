import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'null',
})
export class NullPipe implements PipeTransform {
  transform(v: null) {
    return 0;
  }
}
