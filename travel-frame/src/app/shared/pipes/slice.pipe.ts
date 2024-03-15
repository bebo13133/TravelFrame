import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true
})
export class SlicePipe implements PipeTransform {

  transform(value: string, maxCount = 65): unknown {
    return `${value.substring(0, maxCount)}
    ${value.length > maxCount ? '...' : ''}`;
  }

}
