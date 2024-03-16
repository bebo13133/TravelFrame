import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDestinationComponent } from './edit-destination.component';

describe('EditDestinationComponent', () => {
  let component: EditDestinationComponent;
  let fixture: ComponentFixture<EditDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDestinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
