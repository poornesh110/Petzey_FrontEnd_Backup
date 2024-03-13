import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPetDetailsComponent } from './view-pet-details.component';

describe('ViewPetDetailsComponent', () => {
  let component: ViewPetDetailsComponent;
  let fixture: ComponentFixture<ViewPetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPetDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
