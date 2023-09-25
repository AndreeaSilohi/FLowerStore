import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAutoComponent } from './carousel-auto.component';

describe('CarouselAutoComponent', () => {
  let component: CarouselAutoComponent;
  let fixture: ComponentFixture<CarouselAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselAutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
