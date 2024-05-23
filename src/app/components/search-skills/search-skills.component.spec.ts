import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSkillsComponent } from './search-skills.component';

describe('SearchSkillsComponent', () => {
  let component: SearchSkillsComponent;
  let fixture: ComponentFixture<SearchSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
