import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqComponent } from './eq.component';

describe('EqComponent', () => {
  let component: EqComponent;
  let fixture: ComponentFixture<EqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
