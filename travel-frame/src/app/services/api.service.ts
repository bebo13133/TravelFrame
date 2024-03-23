import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Destination } from '../types/destination';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../types/comments';
import { Story } from '../types/story.models';
import { Like } from '../types/likes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private storiesSource = new BehaviorSubject<Comment[]>([]);
  stories$ = this.storiesSource.asObservable();
  constructor(private http: HttpClient) { }


  getDestinations() {
    const { apiUrl } = environment
    return this.http.get<Destination[]>(`${apiUrl}/data/destinations`)
  }
  createDestination(destinationData: Destination[]): Observable<Destination[]> {
    const { apiUrl } = environment
    return this.http.post<Destination[]>(`${apiUrl}/data/destinations`, destinationData)
  }
  getDestinationById(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Destination>(`${apiUrl}/data/destinations/${id}`);
  }
  editDestination(destinationData: Destination[], id: string) {
    const { apiUrl } = environment
    return this.http.put<Destination>(`${apiUrl}/data/destinations/${id}`, destinationData);

  }
  deleteDestination(id: string) {
    const { apiUrl } = environment
    return this.http.delete<Destination>(`${apiUrl}/data/destinations/${id}`);
  }
  postComment(newComment: Comment): Observable<Comment> {
    const { apiUrl } = environment
    return this.http.post<Comment>(`${apiUrl}/data/posts`, newComment);
  }
  submitStory(formData: FormData): Observable<Story> {
    const { apiUrl } = environment
    return this.http.post<Story>(`${apiUrl}/data/stories`, formData);
  }
  getStories(): Observable<Story[]> {
    const { apiUrl } = environment
    return this.http.get<Story[]>(`${apiUrl}/data/stories`);
  }

  getStoryById(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Story>(`${apiUrl}/data/stories/${id}`);
  }

  addLike( storyId: string,userId: string,): Observable<Like> {
    const like: Like = { userId, storyId };
    const { apiUrl } = environment
    return this.http.post<Like>(`${apiUrl}/data/likes`, like);
  }

  deleteLike(likeId: string): Observable<any> {
    const { apiUrl } = environment

    const url = `${apiUrl}/data/likes/${likeId}`;
    return this.http.delete(url);
  }

  getAllLikes(): Observable<Like[]> {
    const { apiUrl } = environment
    return this.http.get<Like[]>(`${apiUrl}/data/likes`);
  }
  updateLikesCount(storyId: string, userId: string): Observable<any> {
    const { apiUrl } = environment
    const url = `${apiUrl}/data/stories/${storyId}/likesCount`; // URL за вашата ендпойнт логика
    return this.http.put(url, { userId });
  }
  removeLikesCount(storyId: string, userId:string): Observable<any> {
    const { apiUrl } = environment
    const url = `${apiUrl}/data/stories/${storyId}/likesCount/${userId}`; // URL за вашата ендпойнт логика
    return this.http.delete(url);
  }
}
