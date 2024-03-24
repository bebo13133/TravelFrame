import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomeModalComponent } from './search-home-modal.component';

describe('SearchHomeModalComponent', () => {
  let component: SearchHomeModalComponent;
  let fixture: ComponentFixture<SearchHomeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHomeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchHomeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
