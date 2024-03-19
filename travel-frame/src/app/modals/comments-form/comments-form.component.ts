import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../types/comments';

@Component({
  selector: 'app-comments-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comments-form.component.html',
  styleUrl: './comments-form.component.css'

})
export class CommentsFormComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() key: any;

  destinationId: string | null = null;
  commentText: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef, private apiService: ApiService, private commentsService: CommentsService) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.destinationId = params.get('destinationId');

      this.cdr.detectChanges();

    })
  }
  closeModal() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
  sendComment() {
    if (!this.commentText.trim()) {
      alert('The Comment not be empty');
      return;
    }
    const name = localStorage.getItem('name');
    const username = localStorage.getItem('username');
    const userImg = localStorage.getItem('userImg');
    const newComment: Comment = {
      commentText: this.commentText,
      destinationId: this.destinationId ?? undefined,
      name: name ? name : undefined,
      username: username ? username : undefined,
     
    };
    this.isVisible = false;
    this.cdr.detectChanges();

    if (this.destinationId) {

      this.apiService.postComment(newComment).subscribe({
        next: (response) => {

          this.commentText = '';
          this.isVisible = false;
          this.isVisibleChange.emit(this.isVisible);

          this.commentsService.addComment(response);
          this.router.navigate(['destination/details', this.destinationId]);
        },
        error: (error) => {
         
          console.error('Error posting comment:', error);
          alert('An error occurred while posting the comment.');
        }
      })

    }



  }
}
