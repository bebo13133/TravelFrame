import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCatalogComponent } from './slider-catalog.component';

describe('SliderCatalogComponent', () => {
  let component: SliderCatalogComponent;
  let fixture: ComponentFixture<SliderCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SliderCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
