import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { ApiService } from '../../services/api.service';
import { CommentsFormComponent } from '../../modals/comments-form/comments-form.component';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialogComponent,CommentsFormComponent],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.css'
})

export class AsideMenuComponent implements OnInit {

  @Input() isOwner: boolean = false;
  @Input() destinationId: string | null = null;
  confirmDialogVisible: boolean = false; // Добавена променлива
  commentModalVisible: boolean = false;

  reloadKey = 0;
  constructor(private apiService: ApiService,private cdr: ChangeDetectorRef, private router:Router,) { 

  }
  ngOnInit(): void {
    console.log("dsadsa",this.commentModalVisible)
    this.commentModalVisible = false; // Ресетирайте видимостта на модала при инициализация на компонента
  }



  onDeleteConfirmed(destinationId: string, ) {
   
    this.apiService.deleteDestination(destinationId).subscribe({
      next: () => {
        console.log('Destination has been deleted');
       this.router.navigate(['/destinations']);
      },
      error: (error) => {
        console.error('Delete error:', error);
      }
    });
  }
  showConfirmDialog() {

    this.confirmDialogVisible = true;
    this.cdr.detectChanges();
  }


  onDialogConfirm() {
    if (this.destinationId) {
      this.onDeleteConfirmed(this.destinationId);
    }
    this.confirmDialogVisible = false;
  }

  onDialogCancel() {
    this.confirmDialogVisible = false;
  
  }

  toggleCommentModal() {
    this.commentModalVisible = !this.commentModalVisible;
  }

}
