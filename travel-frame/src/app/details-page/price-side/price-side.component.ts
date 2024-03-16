import { Component, Input } from '@angular/core';
import { Destination } from '../../types/destination';
import { CommonModule } from '@angular/common';
import { DataRangePipe } from '../../shared/pipes/data-range.pipe';


@Component({
  selector: 'app-price-side',
  standalone: true,
  imports: [CommonModule,DataRangePipe],
  templateUrl: './price-side.component.html',
  styleUrl: './price-side.component.css'
})
export class PriceSideComponent {
  @Input() destination: Destination | null = null;
  conditionLabels: Record<string, string>= {
    ticketsIncluded: 'Самолетни билети София – Маракеш - София с включен стандартен ръчен багаж и чекиран куфар до 23 кг.',
    allTransportCosts: 'Всички транспортни разходи',
    accommodations: '8 нощувки (5 нощи във вилата, 2 в пустинята и 1 е Маракеш)',
    allMeals: 'Всички закуски и вечери',
    practices: 'Практики',
    atvTour: 'Наем и тур с ATV в пустинята',
    spaAccess: 'Спа център',
    guidesIncluded: '2-ма водачи по време на пътуването от Zero Gravity',
    medicalInsurance: 'Медицинска застраховка с покритие 10000 евро',
    personalExpenses:'Разходи от личен характер',
    alcoholicBeverages:'Алкохолни напитки',
    unspecifiedServices:'Услуги неупоменати в програмата',
    additionalActivitiesFee:'Такси за допълнителните активности',
    cancellationInsurance:'Допълнителна медицинска застраховка',

  };
  getConditionsArray(): Array<{key: string, value: boolean}> { // ще го ползвам вместо да го пиша в html-a
    const conditions = this.destination?.conditions;
    if (!conditions) {
      return [];
    }
    return Object.entries(conditions).map(([key, value]) => ({key, value}));
  }

}
