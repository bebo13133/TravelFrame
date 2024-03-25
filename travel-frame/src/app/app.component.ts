import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './User/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { UserService } from './User/user.service';
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,HomeComponent,FooterComponent,LoginComponent,HttpClientModule,SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClientModule, ApiService, UserService],
})
export class AppComponent {
  // title = 'travel-frame';
}
