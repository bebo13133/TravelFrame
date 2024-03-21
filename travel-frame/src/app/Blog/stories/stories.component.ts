import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CreateStoriesComponent } from '../create-stories/create-stories.component';
import { CommentsService } from '../../services/comments.service';
import { ApiService } from '../../services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Story } from '../../types/story.models';

@Component({
  selector: 'app-create-stories',
  standalone: true,
  imports: [RouterLink, RouterModule,CreateStoriesComponent,CommonModule,DatePipe],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css'
})
export class StoriesComponent implements OnInit {
  currentPage: number = 1;
  commentsPerPage: number = 2;
  totalPages: number = 0;
storiesList: Story[] = [];
hasStories: boolean = false;


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   this.destinationId = params.get('destinationId');
    // });

    this.route.queryParamMap.subscribe(params => {
      const page = params.get('page');
      this.currentPage = page ? parseInt(page, 10) : 1;

      this.loadComments();
    });
  }
  loadComments(): void {
    this.apiService.getStories().subscribe(comments => {
   
        // let filteredComments = comments.filter(comment => comment.destinationId === this.destinationId);
        this.totalPages = Math.ceil(comments.length / this.commentsPerPage);
        this.hasStories = comments.length > 0;

       
        this.storiesList = comments.slice(
          (this.currentPage - 1) * this.commentsPerPage,
          this.currentPage * this.commentsPerPage
        );
    
      
    });
  }

  get pagesArray() {
    let pages: Array<number | string> = [];
  

    pages.push(1);
  

    let showEllipsis = false;
  
    for (let i = 2; i < this.totalPages; i++) {

      if (i === 2 || i === this.totalPages - 1 || Math.abs(this.currentPage - i) <= 1) {
        pages.push(i);
        showEllipsis = true;
      } else {
     
        if (showEllipsis) {
          pages.push('...');
          showEllipsis = false; 
        }
      }
    }
  
  
    if (this.totalPages > 1) {
      pages.push(this.totalPages);
    }
  
    return pages;
  }
  
  isNumber(value: any): boolean {
    return typeof value === 'number';
  }











  navigateToPage(page: number | string): void {
    if (typeof page !== 'number') {
      return; // Прекратяваме изпълнението, ако параметърът не е число
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge', 
    });
  }
}
