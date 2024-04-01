import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.css'
})
export class CookieConsentComponent {
  consentGiven: boolean;

  constructor(private cookieService: CookieService) {
    // Проверете дали съгласието вече е дадено
    this.consentGiven = this.cookieService.check('consentGiven');
  }

  giveConsent(): void {
    // Задайте бисквитка за съгласие
    this.cookieService.set('consentGiven', 'true', { expires: 365 });
    this.consentGiven = true;
  }
}
