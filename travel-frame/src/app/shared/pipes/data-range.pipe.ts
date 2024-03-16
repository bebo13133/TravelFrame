import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataRange',
  standalone: true
})
export class DataRangePipe implements PipeTransform {
  transform(value: { start: string; end: string; } | null | undefined): string {
    if (!value || !value.start || !value.end) {
      return 'Неопределен период';
    }
    const startDate = new Date(value.start).toLocaleDateString();
    const endDate = new Date(value.end).toLocaleDateString();

    return `${startDate} - ${endDate}`;
  }

}
