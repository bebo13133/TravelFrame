import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAsideComponent } from './home-aside.component';

describe('HomeAsideComponent', () => {
  let component: HomeAsideComponent;
  let fixture: ComponentFixture<HomeAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
