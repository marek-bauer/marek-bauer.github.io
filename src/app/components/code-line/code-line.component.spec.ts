import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeLineComponent } from './code-line.component';

describe('CodeLineComponent', () => {
  let component: CodeLineComponent;
  let fixture: ComponentFixture<CodeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
