import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { Favorite } from '../types/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesUpdated = new BehaviorSubject<void>(undefined);

  // Observable, който други компоненти могат да наблюдават
  public favoritesUpdated$ = this.favoritesUpdated.asObservable();


  constructor(private http: HttpClient) { }
  notifyFavoritesUpdated(): void {
    this.favoritesUpdated.next();
  }
  addToFavorites(destinationId: string) {
    return this.http.post(`${environment.apiUrl}/data/favorites`, { destinationId });
  }
  removeFromFavorites(destinationId: string) {
   
    return this.http.delete(`${environment.apiUrl}/data/favorites/${destinationId}`);
  }
  getAllFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${environment.apiUrl}/data/favorites`);
  }
}
