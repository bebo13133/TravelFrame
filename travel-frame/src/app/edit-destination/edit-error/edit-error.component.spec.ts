import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditErrorComponent } from './edit-error.component';

describe('EditErrorComponent', () => {
  let component: EditErrorComponent;
  let fixture: ComponentFixture<EditErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
