import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoriesComponent } from './create-stories.component';

describe('CreateStoriesComponent', () => {
  let component: CreateStoriesComponent;
  let fixture: ComponentFixture<CreateStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
