import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addNewLine',
  standalone: true
})
export class AddNewLinePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';


    const sentences = value.split('. ');


    const result = sentences.map((sentence, index) => {

      const sentenceWithEndChar = sentence + (index < sentences.length - 1 ? '.' : '');
      return ((index + 1) % 4 === 0) ? `${sentenceWithEndChar}\n\n` : sentenceWithEndChar;
    }).join(' ');

    return result;
  }

}
