import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true
})
export class SlicePipe implements PipeTransform {

  transform(value: string, maxCount = 65): unknown {
    console.log(`Value length: ${value.length}, MaxCount: ${maxCount}`);
  const result = `${value.slice(0, maxCount)}${value.length > maxCount ? '...' : ''}`;
  console.log(`Transformed value: ${result}`);
  return result;
  }

}
