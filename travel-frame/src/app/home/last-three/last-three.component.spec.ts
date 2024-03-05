import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastThreeComponent } from './last-three.component';

describe('LastThreeComponent', () => {
  let component: LastThreeComponent;
  let fixture: ComponentFixture<LastThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
