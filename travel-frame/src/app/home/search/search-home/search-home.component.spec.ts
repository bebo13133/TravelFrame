import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomeComponent } from './search-home.component';

describe('SearchHomeComponent', () => {
  let component: SearchHomeComponent;
  let fixture: ComponentFixture<SearchHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
