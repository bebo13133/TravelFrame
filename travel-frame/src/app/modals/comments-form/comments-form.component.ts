import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comments-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './comments-form.component.html',
  styleUrl: './comments-form.component.css'

})
export class CommentsFormComponent implements OnInit{
  @Input() isVisible: boolean = false;

  @Input() key: any;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  destinationId: string | null = null;
  commentText: string = '';

  constructor(private route: ActivatedRoute,private router:Router,private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.destinationId = params.get('destinationId');
     
      this.cdr.detectChanges();

    })
  }

  sendComment() {
    console.log('Comment sent');
    this.isVisible = false;
    // this.cdr.detectChanges();
    this.commentText = '';// изчиствам полето 
    // if (this.destinationId) {
    //   // console.log(this.destinationId)
    //   this.router.navigate(['destination/details', this.destinationId]);
    // }
    // console.log(this.isVisible)


  }
}
