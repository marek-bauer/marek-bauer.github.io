import { Component, Directive, Input, ContentChildren, QueryList, TemplateRef} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { SkillComponent } from '../skill/skill.component';

@Directive({
  selector: '[skill]',
  standalone: true,
})
export class Skill{
  @Input() name!: string;
  @Input() lvl!: number;

  constructor(public templateRef: TemplateRef<any>) {}

  isEmpty(): boolean{
    console.log(this.templateRef.elementRef.nativeElement);
    return false//this.templateRef.elementRef.nativeElement.firstChild == undefined
  }
}

@Component({
  selector: 'category',
  template: '',
  standalone: true,
  imports: [CommonModule]
})
export class Category{
  @Input({required: true}) name!: string;
  @Input({required: true}) skillLevelFn!: (x: number) => string;
  @Input({required: false}) opened: boolean = true;
  @ContentChildren(Skill) skills!: QueryList<Skill>;
}

@Component({
  selector: 'search-skills',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, SkillComponent, Category],
  templateUrl: './search-skills.component.html',
  styleUrl: './search-skills.component.scss'
})
export class SearchSkillsComponent {
  @ContentChildren(Category) categories!: QueryList<Category>;
}
