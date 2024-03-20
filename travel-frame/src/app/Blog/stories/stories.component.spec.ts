import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesComponent } from './stories.component';

describe('CreateStoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
