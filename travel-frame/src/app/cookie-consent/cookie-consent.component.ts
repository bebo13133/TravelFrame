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
    // Проверявам дали съгласието вече е дадено
    this.consentGiven = this.cookieService.check('consentGiven');
  }

  giveConsent(): void {
   
    this.cookieService.set('consentGiven', 'true', { expires: 2 });
    this.consentGiven = true;
  }
}
