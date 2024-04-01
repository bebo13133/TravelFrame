import { Component, Input } from '@angular/core';
import { Destination } from '../../types/destination';
import { CommonModule } from '@angular/common';
import { DataRangePipe } from '../../shared/pipes/data-range.pipe';
import emailjs from 'emailjs-com';
import { UserService } from '../../User/user.service';


@Component({
  selector: 'app-price-side',
  standalone: true,
  imports: [CommonModule,DataRangePipe],
  templateUrl: './price-side.component.html',
  styleUrl: './price-side.component.css'
})
export class PriceSideComponent {
  @Input() destination: Destination | null = null;
  private   user: any;
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
  constructor(private userService: UserService){
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }


  
  getConditionsArray(): Array<string> {
    const conditions = this.destination?.conditions;
    if (!conditions) {
      return [];
    }
    return Object.entries(conditions)
      .filter(([key, value]) => value === true)
      .map(([key, _]) => this.conditionLabels[key] || key); // Използвайте етикетите от conditionLabels
  }
  
  



   sendEmail = () => {

    const templateParams = {
        to_email: this.user.email,
        message: `You Welcome  ${this.user.email}`,
        to_name: `${this.user.email}`,
        reply_to: "borislaviliev47@gmail.com",
       to_destination: `${this.destination?.title}`,
      
        
    }
     emailjs
        .send(
            "service_zxhuqbx",
            "template_ym4dhid",
            templateParams,   
            "iRYFR4BuAXZEBF1ld",
        )
        .then(result => {
        console.log("Email sent successfully:", result);
        },

            (err) => {
                throw new Error(err)
            }
        )
    console.log(templateParams)

}
}
