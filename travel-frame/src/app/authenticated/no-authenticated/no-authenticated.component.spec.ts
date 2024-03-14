import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAuthenticatedComponent } from './no-authenticated.component';

describe('NoAuthenticatedComponent', () => {
  let component: NoAuthenticatedComponent;
  let fixture: ComponentFixture<NoAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAuthenticatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
