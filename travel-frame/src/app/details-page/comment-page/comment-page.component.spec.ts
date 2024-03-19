import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPageComponent } from './comment-page.component';

describe('CommentPageComponent', () => {
  let component: CommentPageComponent;
  let fixture: ComponentFixture<CommentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
