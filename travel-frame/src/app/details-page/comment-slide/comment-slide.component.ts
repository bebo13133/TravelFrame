import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../types/comments';

@Component({
  selector: 'app-comment-slide',
  standalone: true,
  imports: [],
  templateUrl: './comment-slide.component.html',
  styleUrl: './comment-slide.component.css'
})
export class CommentSlideComponent implements OnInit {
  @Input() destinationId: string | null = null;
  commentsList: Comment[] = [];

  constructor(private commentsService: CommentsService) { }


  ngOnInit(): void {
    this.commentsService.loadComments();
    this.commentsService.comments$.subscribe(comments => {
      if (this.destinationId) {
        this.commentsList = comments.filter(comment => comment.destinationId === this.destinationId);
        // console.log("List", this.commentsList)
      } else {
        this.commentsList = [];
      }
    });
  }

}
