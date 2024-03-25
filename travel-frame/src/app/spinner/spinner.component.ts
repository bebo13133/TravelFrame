import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit {
  showSpinner = false;

  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) {
  
  }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status === 'start';
      this.cdRef.detectChanges(); 
    });
    
  }
}
