import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../types/comments';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-slide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-slide.component.html',
  styleUrl: './comment-slide.component.css'
})
export class CommentSlideComponent implements OnInit, AfterViewInit {
  @Input() destinationId: string | null = null;
  commentsList: Comment[] = [];
  @ViewChild('slideRow') slideRow!: ElementRef<HTMLDivElement>;
  @ViewChild('mainElement') mainElement!: ElementRef<HTMLElement>;
  currentIndex: number = 0;
  btns = [0, 1, 2, 3];
  constructor(private commentsService: CommentsService) { }


  ngOnInit(): void {
    this.commentsService.loadComments();
    this.commentsService.comments$.subscribe(comments => {
      if (this.destinationId) {
        this.commentsList = comments.filter(comment => comment.destinationId === this.destinationId);
        // console.log("List", this.commentsList)
      } else {
        this.commentsList = [];
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
    const mainWidth = this.mainElement.nativeElement.offsetWidth;
    const translateValue = this.currentIndex * -mainWidth;
    this.slideRow.nativeElement.style.transform = `translateX(${translateValue}px)`;
  }

  @HostListener('window:resize')
  onresize(): void {
    this.updateSlide();
  }


}
