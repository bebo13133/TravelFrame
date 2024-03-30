import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PriceSideComponent } from './price-side/price-side.component';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Destination } from '../types/destination';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommentSlideComponent } from './comment-slide/comment-slide.component';
import { VerticalMenuComponent } from './vertical-menu/vertical-menu.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule, PriceSideComponent, AuthenticatedComponent, AsideMenuComponent, 
    ConfirmDialogComponent,
    CommentSlideComponent,
    VerticalMenuComponent,
    RouterModule
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {
  backgroundImageUrl: string = '';
  destination: Destination | null = null;
  currentImageIndex: number = 0;
  intervalId: any;
  isOwner: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private dialog: MatDialog) { }


  ngOnInit() {
    // this.loadBackgroundImage();
    window.scrollTo({top:0})
    this.route.fragment.subscribe(frag => {
      if (frag) { 
        const element = document.getElementById(frag);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
    this.loadDestinationDetails();
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  loadDestinationDetails() {

    const id = this.route.snapshot.paramMap.get('destinationId');
    
    if (id) {
      this.apiService.getDestinationById(id).subscribe({
        next: (destination: Destination) => {
          this.destination = destination;
          // console.log(this.destination)
          const userId = localStorage.getItem('userId');


          this.isOwner = destination._ownerId === userId;
          if (destination.image instanceof File) {
            this.backgroundImageUrl = URL.createObjectURL(destination.image);
          } else {

            this.backgroundImageUrl = destination.image || '/assets/media/desert.webp';
          }
          this.startSlideshow();

        },
        error: (error) => {
          console.error('Error fetching destination details:', error);
          this.backgroundImageUrl = '/assets/media/error.jpg';
        }
      });
    }
  };

  startSlideshow(): void {

    const images = this.destination?.images ?? [];
    if (images.length > 1) {
      this.intervalId = setInterval(() => {

        this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
      }, 3000);
    }

  }

  // за коментарите после
  // this.commentsService.comments$.subscribe(comments => {
  //   this.commentsList = comments;
  // });
}

