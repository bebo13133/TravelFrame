import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowAreComponent } from './how-are.component';

describe('HowAreComponent', () => {
  let component: HowAreComponent;
  let fixture: ComponentFixture<HowAreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowAreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HowAreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
