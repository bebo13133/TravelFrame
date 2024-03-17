import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [CommonModule,RouterLink,ConfirmDialogComponent,MatDialogModule],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.css'
})
export class AsideMenuComponent {
  @Input() isOwner: boolean = false;
  @Input() destinationId: string | null = null; 
constructor(private dialog: MatDialog, private apiService:ApiService) {}


// getSafeDestinationId(): string | undefined {
//   return this.destinationId ? this.destinationId : undefined;
// }
  confirmDelete(destinationId: string | undefined) {
    console.log('ид',destinationId)
    if (!destinationId) {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {message: 'Сигурни ли сте, че искате да изтриете?' }, 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Резултат от диалога:', result);
      if (result) {
        this.apiService.deleteDestination(destinationId).subscribe({
          next: () => {
            console.log('Дестинацията беше успешно изтрита.');
            // Можете да добавите допълнителна логика тук, например пренасочване
          },
          error: (error) => {
            console.error('Възникна грешка при изтриването:', error);
          }
        });
      }
    });
  }
}
