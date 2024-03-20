import { Component, Input, OnInit } from '@angular/core';
import { Destination } from '../../types/destination';
import { CommonModule } from '@angular/common';
import { DataRangePipe } from "../../shared/pipes/data-range.pipe";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-last-three',
    standalone: true,
    templateUrl: './last-three.component.html',
    styleUrl: './last-three.component.css',
    imports: [CommonModule, DataRangePipe,RouterLink]
})
export class LastThreeComponent implements OnInit{
  @Input() destinations: Destination[] = [];

  ngOnInit(): void {
    console.log(this.destinations); // Примерно логване на дестинациите
  }
}
