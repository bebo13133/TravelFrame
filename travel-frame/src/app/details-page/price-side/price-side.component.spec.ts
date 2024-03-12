import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSideComponent } from './price-side.component';

describe('PriceSideComponent', () => {
  let component: PriceSideComponent;
  let fixture: ComponentFixture<PriceSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
