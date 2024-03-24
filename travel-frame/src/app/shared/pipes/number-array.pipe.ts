import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberArray',
  standalone: true
})
export class NumberToArrayPipe implements PipeTransform {
  transform(value: number, args?: any): any[] {
    return new Array(value).fill(0).map((x, i) => i + 1);
  }

}
