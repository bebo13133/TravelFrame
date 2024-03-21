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
isLiked: { [storyId: string]: { liked: boolean, likeId?: string } } = {};


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   this.destinationId = params.get('destinationId');
    // });
    this.loadInitialData();
    this.route.queryParamMap.subscribe(params => {
      const page = params.get('page');
      this.currentPage = page ? parseInt(page, 10) : 1;

      this.loadStories();
    });
  
  }


  loadInitialData(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadLikes(userId);
      // Тук можете да добавите и други заявки за начално зареждане на данни
    }
  }

  loadLikes(userId: string): void {
    this.apiService.getAllLikes().subscribe(allLikes => {
      const userLikes = allLikes.filter(like => like._ownerId === userId);
      console.log('адсадсадса',userLikes);

      userLikes.forEach(like => {
        this.isLiked[like.storyId || ''] = { liked: true, likeId: like._id };
        console.log('isliked',this.isLiked)
      });
      // Тук може да се наложи да актуализирате view-то, ако Angular не го прави автоматично
    });
  }









  loadStories(): void {
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


  toggleLike(storyId: string): void {
    console.log(storyId);
    const userId = localStorage.getItem('userId');
    if (userId) {
      const currentLike = this.isLiked[storyId];
      if (currentLike && currentLike.liked) {
        // Проверка дали имаме валидно likeId преди да извикаме deleteLike
        if (typeof currentLike.likeId === 'string') {
          this.apiService.deleteLike(currentLike.likeId).subscribe(() => {
            this.isLiked[storyId] = { liked: false };
          });
        } else {
          console.error('likeId is undefined, cannot delete like');
        }
      } else {
        this.apiService.addLike(storyId, userId).subscribe((response: any) => {
          const likeId = response._id; // Заменете със съответния път, ако е необходимо
          this.isLiked[storyId] = { liked: true, likeId: likeId };
        });
      }
    } else {
      console.error('User ID not found in localStorage');
    }
  }
  
  


}
