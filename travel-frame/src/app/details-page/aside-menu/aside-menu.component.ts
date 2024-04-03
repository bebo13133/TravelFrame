import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { ApiService } from '../../services/api.service';
import { CommentsFormComponent } from '../../modals/comments-form/comments-form.component';
import { UserService } from '../../User/user.service';
import { environment } from '../../../environments/access-key';
import { Subscription } from 'rxjs';

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
  @ViewChild(CommentsFormComponent) commentsForm!: CommentsFormComponent;
  reloadKey = 0;
  isAdmin: boolean = false;
  private subscription: Subscription;
  constructor(private apiService: ApiService,private cdr: ChangeDetectorRef, private router:Router, private userService: UserService) { 
    this.commentModalVisible = false;

    this.subscription = this.userService.user$.subscribe(user => {
      this.isAdmin = user?._id === environment.KEY;
    });
  }


  ngOnInit(): void {

    // this.commentModalVisible = false; // Ресетирайте видимостта на модала при инициализация на компонента
  }



  onDeleteConfirmed(destinationId: string, ) {
    if (!this.isAdmin) {
      console.error('Delete error: User is not the owner of this destination.');
      return;
    }
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
    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }
}
