import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../types/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsSource = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSource.asObservable();

  constructor() { }

  addComment(newComment: Comment) {
    const currentComments = this.commentsSource.getValue();
    this.commentsSource.next([...currentComments, newComment]);
  }

}
