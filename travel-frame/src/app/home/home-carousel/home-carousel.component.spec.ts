import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarouselComponent } from './home-carousel.component';

describe('HomeCarouselComponent', () => {
  let component: HomeCarouselComponent;
  let fixture: ComponentFixture<HomeCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
