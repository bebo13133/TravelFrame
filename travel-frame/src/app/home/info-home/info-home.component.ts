import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { UserService } from '../../User/user.service';
import {v4 as uuidv4} from 'uuid';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-info-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './info-home.component.html',
  styleUrl: './info-home.component.css'
})
export class InfoHomeComponent {
  private   user: any;

  constructor(private userService: UserService){
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }
  codes =  uuidv4();
  promoCodes=this.codes.slice(0,8)


  sendEmailNews = (e: Event) => {
    e.preventDefault();
    console.log(e.target as HTMLFormElement)

    const templateParams = {
        to_email:  this.user.email,
        message: `Welcome to Frame Travel . You have successfully signed up to receive news.`,
        to_name: `${this.user.username || this.user.name}`,
        reply_to: "borislab@gmail.com",
        promo: this.promoCodes,
        
    }
     emailjs
        .send(
            "service_zxhuqbx",
            "template_qsf9m9q",
            templateParams,   // Взимам като 3 параметър според изискванията на emailjs информацията 
            "iRYFR4BuAXZEBF1ld",
        )
        .then(result => {
        console.log("Email sent successfully:", result);
        templateParams.to_email.reset();

        },

            (err) => {
                throw new Error(err)
            }
        )
    console.log(templateParams)

}

}
