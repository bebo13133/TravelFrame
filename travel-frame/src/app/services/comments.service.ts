import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../types/comments';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsSource = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSource.asObservable();

  constructor(private http: HttpClient) { }

  addComment(newComment: Comment) {
    const currentComments = this.commentsSource.getValue();
    this.commentsSource.next([...currentComments, newComment]);
  }



  loadComments(): void {
    const { apiUrl } = environment;
    this.http.get<Comment[]>(`${apiUrl}/data/posts`).subscribe(comments => {
      this.commentsSource.next(comments);
    });
  }
}
