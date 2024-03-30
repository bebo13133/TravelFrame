import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-for-us',
  standalone: true,
  imports: [],
  templateUrl: './for-us.component.html',
  styleUrl: './for-us.component.css'
})
export class ForUsComponent implements OnInit{
ngOnInit(): void {
  window.scrollTo({top:0})
}
}
