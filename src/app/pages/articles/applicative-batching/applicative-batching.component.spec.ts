import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicativeBatchingComponent } from './applicative-batching.component';

describe('ApplicativeBatchingComponent', () => {
  let component: ApplicativeBatchingComponent;
  let fixture: ComponentFixture<ApplicativeBatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicativeBatchingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicativeBatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
