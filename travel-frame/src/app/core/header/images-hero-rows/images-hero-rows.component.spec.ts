import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesHeroRowsComponent } from './images-hero-rows.component';

describe('ImagesHeroRowsComponent', () => {
  let component: ImagesHeroRowsComponent;
  let fixture: ComponentFixture<ImagesHeroRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesHeroRowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagesHeroRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
