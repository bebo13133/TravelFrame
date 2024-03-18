
// confirm-dialog.component.ts
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-confirm-modal',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  imports: [CommonModule]
})
export class ConfirmDialogComponent {
  @Input() isVisible: boolean = false;
  @Output() confirmed: EventEmitter<void> = new EventEmitter();
  @Output() canceled: EventEmitter<void> = new EventEmitter();

  onConfirm() {
    this.confirmed.emit();
    this.isVisible = false;
  }

  onCancel() {
    this.canceled.emit();
    this.isVisible = false;
  }
}