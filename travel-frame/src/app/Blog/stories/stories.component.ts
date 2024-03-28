import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CreateStoriesComponent } from '../create-stories/create-stories.component';
import { CommentsService } from '../../services/comments.service';
import { ApiService } from '../../services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Story } from '../../types/story.models';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { AsiseMenuStoriesComponent } from './asise-menu-stories/asise-menu-stories.component';
import { Like } from '../../types/likes';
import { ProfilePhotoService } from '../../services/profile-photo.service';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [RouterLink, RouterModule, CreateStoriesComponent, CommonModule, DatePipe, SlicePipe, AsiseMenuStoriesComponent],
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
  likesForCurrentStory: Like[] = []; // Използвайте дефинирания интерфейс тук
  likesCountForCurrentStory: number = 0;
  images$ = this.photoService.images$;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private photoService: ProfilePhotoService
  ) {
    this.photoService.fetchImages();

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const page = params.get('page');
      this.currentPage = page ? parseInt(page, 10) : 1;

      this.loadStories();
    });
    this.loadInitialData();

    this.loadStoriesWithLikes()

  }


  loadInitialData(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadLikes(userId);
    }
  }

  loadLikes(userId: string): void {
    this.apiService.getAllLikes().subscribe(allLikes => {
      const userLikes = allLikes.filter(like => like._ownerId === userId);


      userLikes.forEach(like => {
        this.isLiked[like.storyId || ''] = { liked: true, likeId: like._id };
        console.log('isliked', this.isLiked)
      });

    });
  }

  // loadStories(): void {
  //   this.apiService.getStories()
  //   this.apiService.getStories().subscribe(comments => {

  //       // let filteredComments = comments.filter(comment => comment.destinationId === this.destinationId);
  //       this.totalPages = Math.ceil(comments.length / this.commentsPerPage);
  //       this.hasStories = comments.length > 0;


  //       this.storiesList = comments.slice(
  //         (this.currentPage - 1) * this.commentsPerPage,
  //         this.currentPage * this.commentsPerPage
  //       );


  //   });
  // }

  loadStories(): void {
    this.photoService.fetchImagesMap().then(imagesMap => {
      this.apiService.getStories().subscribe(stories => {
        // Прилагане на изображенията към авторите на историите
        const storiesWithImages = stories.map(story => {
          const authorImage = imagesMap[story._ownerId] || 'път_към_стандартно_изображение';

          return { ...story, authorImage: authorImage };

        });

        // Прилагане на пагинация и обновяване на състоянието
        this.totalPages = Math.ceil(storiesWithImages.length / this.commentsPerPage);
        this.hasStories = storiesWithImages.length > 0;

        this.storiesList = storiesWithImages.slice(
          (this.currentPage - 1) * this.commentsPerPage,
          this.currentPage * this.commentsPerPage
        );
      });
    });
  }

  loadStoriesWithLikes(): void {
    // this.apiService.getStories().subscribe(stories => {
      // this.storiesList = stories;
      this.storiesList.forEach((story, index) => {
        this.apiService.getAllLikes().subscribe(allLikes => {
          const likesForStory = allLikes.filter(like => like.storyId === story._id);

          this.storiesList[index] = { ...story, likesCount: likesForStory.length };
        });
      // });
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

    const userId = localStorage.getItem('userId');
    if (userId) {
      const currentLike = this.isLiked[storyId];
      if (currentLike && currentLike.liked) {
        if (typeof currentLike.likeId === 'string') {
          this.apiService.deleteLike(currentLike.likeId).subscribe(() => {
            this.isLiked[storyId] = { liked: false };
            this.loadStoriesWithLikes();
          });
        } else {
          console.error('likeId is undefined, cannot delete like');
        }
      } else {
        this.apiService.addLike(storyId, userId).subscribe((response: any) => {
          const likeId = response._id;
          this.isLiked[storyId] = { liked: true, likeId: likeId };
          this.loadStoriesWithLikes();
        });
      }

    } else {
      console.error('User ID not found in localStorage');
    }


  }




}