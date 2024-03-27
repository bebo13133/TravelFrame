import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTermsComponent } from './general-terms.component';

describe('GeneralTermsComponent', () => {
  let component: GeneralTermsComponent;
  let fixture: ComponentFixture<GeneralTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralTermsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
