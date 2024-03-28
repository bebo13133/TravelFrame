import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Favorite } from '../types/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }

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
