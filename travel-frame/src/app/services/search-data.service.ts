import { Injectable } from '@angular/core';
import { Destination } from '../types/destination';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {
  private searchResultSource = new BehaviorSubject<Destination[]>([]);
  searchResults$ = this.searchResultSource.asObservable();

  setSearchResults(data: Destination[]) {
    this.searchResultSource.next(data);
  }
  constructor() { }
}
