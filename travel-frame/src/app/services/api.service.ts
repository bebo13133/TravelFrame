import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Destination } from '../types/destination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
  editDestination(destinationData: Destination[],id: string){
    const {apiUrl} = environment
    return this.http.put<Destination>(`${apiUrl}/data/destinations/${id}`, destinationData);

  }
  deleteDestination(id: string) {
    const {apiUrl} = environment
    return this.http.delete<Destination>(`${apiUrl}/data/destinations/${id}`);
  }

}
