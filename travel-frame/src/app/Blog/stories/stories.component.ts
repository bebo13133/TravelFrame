import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CreateStoriesComponent } from '../create-stories/create-stories.component';

@Component({
  selector: 'app-create-stories',
  standalone: true,
  imports: [RouterLink, RouterModule,CreateStoriesComponent],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css'
})
export class StoriesComponent  {
  // stories$: Observable<Story[]>;
  // error$: Observable<string>;

  // constructor(private store: Store<State>) {
  //   this.stories$ = this.store.pipe(select(state => state.story.stories));
  //   this.error$ = this.store.pipe(select(state => state.story.error));
  // }

  // ngOnInit(): void {
  //   this.store.dispatch(loadStories());
  // }
}
