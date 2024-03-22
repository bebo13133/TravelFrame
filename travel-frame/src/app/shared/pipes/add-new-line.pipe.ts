import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addNewLine',
  standalone: true
})
export class AddNewLinePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;


    const sentences = value.split('. ');


    const result = sentences.map((sentence, index) => {
     
      const endChar = (index < sentences.length - 1) ? '. ' : '';
      return ((index + 1) % 4 === 0) ? `${sentence}${endChar}\n` : `${sentence}${endChar}`;
    }).join('');

    return result;
  }

}
