import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSlideComponent } from './comment-slide.component';

describe('CommentSlideComponent', () => {
  let component: CommentSlideComponent;
  let fixture: ComponentFixture<CommentSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentSlideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
