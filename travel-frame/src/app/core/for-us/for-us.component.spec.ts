import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForUsComponent } from './for-us.component';

describe('ForUsComponent', () => {
  let component: ForUsComponent;
  let fixture: ComponentFixture<ForUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
