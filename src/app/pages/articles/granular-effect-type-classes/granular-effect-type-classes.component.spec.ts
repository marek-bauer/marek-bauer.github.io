import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GranularEffectTypeClassesComponent } from './granular-effect-type-classes.component';

describe('GranularEffectTypeClassesComponent', () => {
  let component: GranularEffectTypeClassesComponent;
  let fixture: ComponentFixture<GranularEffectTypeClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GranularEffectTypeClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GranularEffectTypeClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
