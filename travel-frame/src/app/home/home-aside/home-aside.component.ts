import { Component, OnInit } from '@angular/core';
import { SearchHomeModalComponent } from '../search-home-modal/search-home-modal.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../User/user.service';

@Component({
  selector: 'app-home-aside',
  standalone: true,
  imports: [SearchHomeModalComponent,CommonModule,RouterLink, RouterModule],
  templateUrl: './home-aside.component.html',
  styleUrl: './home-aside.component.css'
})
export class HomeAsideComponent implements OnInit{

isLoggedIn: boolean = false
constructor(private userService: UserService, private router: Router){

}
ngOnInit(): void {
  this.isLoggedIn = this.userService.isLoggedIn;
  // if (!this.isLoggedIn) {
  //   this.router.navigate(['/destinations'])
  // }
}


}
