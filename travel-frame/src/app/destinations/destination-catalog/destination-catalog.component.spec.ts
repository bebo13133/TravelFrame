import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationCatalogComponent } from './destination-catalog.component';

describe('DestinationCatalogComponent', () => {
  let component: DestinationCatalogComponent;
  let fixture: ComponentFixture<DestinationCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestinationCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
