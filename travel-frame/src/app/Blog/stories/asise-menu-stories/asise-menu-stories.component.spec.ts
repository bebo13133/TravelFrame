import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiseMenuStoriesComponent } from './asise-menu-stories.component';

describe('AsiseMenuStoriesComponent', () => {
  let component: AsiseMenuStoriesComponent;
  let fixture: ComponentFixture<AsiseMenuStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsiseMenuStoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsiseMenuStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
