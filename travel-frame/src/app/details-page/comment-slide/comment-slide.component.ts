import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../types/comments';
import { CommonModule } from '@angular/common';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment-slide',
  standalone: true,
  imports: [CommonModule,SlicePipe, RouterLink],
  templateUrl: './comment-slide.component.html',
  styleUrl: './comment-slide.component.css'
})
export class CommentSlideComponent implements OnInit, AfterViewInit {
  @Input() destinationId: string | null = null;
  hasComments: boolean = false;
  commentsList: Comment[] = [];
  @ViewChild('slideRow') slideRow!: ElementRef<HTMLDivElement>;
  @ViewChild('mainElement') mainElement!: ElementRef<HTMLElement>;
  currentIndex: number = 0;
  btns = [0, 1, 2, 3];
  constructor(private commentsService: CommentsService) { }


  ngOnInit(): void {
    this.commentsService.loadComments()
 
    this.commentsService.comments$.subscribe(comments => {
      if (this.destinationId) {
        // this.commentsList = comments.filter(comment => comment.destinationId === this.destinationId);
        let filteredComments = comments.filter(comment => comment.destinationId === this.destinationId);
        this.hasComments = comments && comments.length > 0;
     
        filteredComments.sort((a, b) => (b._createdOn || 0) - (a._createdOn || 0));
  

        this.commentsList = filteredComments.slice(0, 4);
      
        this.btns = Array(Math.min(this.commentsList.length, 4)).fill(0).map((x, i) => i); 
        // this.btns = Array.from({length: Math.min(this.commentsList.length, 4)}, (_, i) => i);
      } else {
        this.commentsList = [];
        this.btns = [];
      }
    });
  }


  ngAfterViewInit(): void {

    this.updateSlide();
  }

  setActiveBtn(index: number): void {
    this.currentIndex = index;
    this.updateSlide();
  }

  updateSlide(): void {
    if (!this.mainElement?.nativeElement || !this.slideRow?.nativeElement) {
      return;
    }
    const mainWidth = this.mainElement.nativeElement.offsetWidth;
    const translateValue = this.currentIndex * -mainWidth;
    this.slideRow.nativeElement.style.transform = `translateX(${translateValue}px)`;
  }

  @HostListener('window:resize')
  onresize(): void {
    this.updateSlide();
  }


}
