import { Component } from '@angular/core';
import { Destination } from '../../types/destination';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-home-modal',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './search-home-modal.component.html',
  styleUrl: './search-home-modal.component.css'
})
export class SearchHomeModalComponent {

  isVisible: boolean = false;
  filteredLocationList: Destination[] = [];
  stories: Destination[] = []

  showModal(): void {
    this.isVisible = true;

  }

  closeModal(): void {
    this.isVisible = false;
    console.log('show');

  }

  filterResults(text: string): void {
//     const trimmedText = text.trim();
//   this.filteredLocationList = [...this.stories]; 

//     if (!trimmedText) {
//       this.filteredLocationList = this.stories;
//     } else {
//       this.filteredLocationList = this.stories.filter(
//         story => story?.title.toLowerCase().includes(trimmedText.toLowerCase())
//       );
//       //  console.log('destinations:',  this.filteredLocationList);

//     }

//     this.searchStoryService.setSearchResults(this.filteredLocationList);

// this.closeModal()
//     this.router.navigate(['/search-blog'])

  }


}
