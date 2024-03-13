import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponentComponent } from './auth-component.component';

describe('AuthComponentComponent', () => {
  let component: AuthComponentComponent;
  let fixture: ComponentFixture<AuthComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
