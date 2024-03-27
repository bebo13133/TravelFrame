import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../types/comments';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.css'],
  standalone: true,
  imports: [CommonModule,DatePipe, RouterLink, RouterModule]
})
export class CommentPageComponent implements OnInit {
  hasComments: boolean = false;
  commentsList: Comment[] = [];
  destinationId: string | null = null;
  currentPage: number = 1;
  commentsPerPage: number = 3;
  totalPages: number = 0;

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }



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
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.destinationId = params.get('destinationId');
    });

    this.route.queryParamMap.subscribe(params => {
      const page = params.get('page');
      this.currentPage = page ? parseInt(page, 10) : 1;

      this.loadComments();
    });
  }

  loadComments(): void {
    this.commentsService.loadComments();
    this.commentsService.comments$.subscribe(comments => {
      if (this.destinationId) {
        let filteredComments = comments.filter(comment => comment.destinationId === this.destinationId);
        this.totalPages = Math.ceil(filteredComments.length / this.commentsPerPage);
        this.hasComments = filteredComments.length > 0;

       
        this.commentsList = filteredComments.slice(
          (this.currentPage - 1) * this.commentsPerPage,
          this.currentPage * this.commentsPerPage
        );
      } else {
        this.commentsList = [];
      }
    });
  }

  navigateToPage(page: number | string): void {
    if (typeof page !== 'number') {
      return; 
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge', 
    });
  }
}
