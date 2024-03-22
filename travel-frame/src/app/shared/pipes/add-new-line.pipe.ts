import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addNewLine',
  standalone: true
})
export class AddNewLinePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Разделяне на текста на изречения, използвайки точка като разделител
    const sentences = value.split('. ');

    // Вмъкване на нов ред след всяко четвърто изречение
    const result = sentences.map((sentence, index) => {
      // Добавяме точка обратно към всяко изречение
      const sentenceWithEndChar = sentence + (index < sentences.length - 1 ? '.' : '');
      return ((index + 1) % 4 === 0) ? `${sentenceWithEndChar}\n\n` : sentenceWithEndChar;
    }).join(' ');

    return result;
  }

}
