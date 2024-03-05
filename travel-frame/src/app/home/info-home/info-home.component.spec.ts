import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHomeComponent } from './info-home.component';

describe('InfoHomeComponent', () => {
  let component: InfoHomeComponent;
  let fixture: ComponentFixture<InfoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
