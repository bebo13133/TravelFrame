import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule, CommonModule,MatExpansionModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {
  panelOpenState = false;
}
