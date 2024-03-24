import { Injectable } from '@angular/core';
import { Story } from '../types/story.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchStoryService {
  private searchResultSource = new BehaviorSubject<Story[]>([]);
  searchStory$ = this.searchResultSource.asObservable();

  setSearchResults(data: Story[]) {
    this.searchResultSource.next(data);
  }
  constructor(){}
}
